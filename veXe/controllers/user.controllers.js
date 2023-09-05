const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatarUrl = require("gravatar-url");
const register = async (req, res) => {
    const { name, email, password, numberPhone } = req.body;
    try {
        // tạo avatar mặc định
        const avatarUrl = gravatarUrl(email);
        // tạo ra một chuỗi ngẫu nhiên
        const salt = bcrypt.genSaltSync(10);
        // mã hóa salt + password
        const hashPassword = bcrypt.hashSync(password, salt);
        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            numberPhone,
            avatar: avatarUrl,
        });
        res.status(201).send(newUser);
    } catch (error) {
        res.status(500).send(error);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    // b1 : tìm ra user đang đăng nhập dựa trên trên email
    const user = await User.findOne({
        where: {
            email,
        },
    });
    if (user) {
        // b2 : kiểm mật khẩu có đúng hay không

        const isAuth = bcrypt.compareSync(password, user.password);
        console.log("isAuth : ", isAuth);
        if (isAuth) {
            const token = jwt.sign(
                { email: user.email, type: user.type },
                "tuong-tinh-2350",
                { expiresIn: 60 * 60 }
            );
            res.status(200).send({ message: "Đăng Nhập Thành Công ! ", token });
        } else {
            res.status(500).send({
                message: "Tài khoãng hoặc mật khẩu không đúng",
            });
        }
    } else {
        res.status(404).send({ message: "Không tìm thấy email phù hợp" });
    }
};

const uploadAvatar = async (req, res) => {
    const { file } = req;
    const urlImage = `http://localhost:3000/${file.path}`;
    const { user } = req;
    const userFound = await User.findOne({
        email: user.email,
    });
    userFound.avatar = urlImage;
    await userFound.save();
    res.send(userFound);
};

module.exports = {
    register,
    login,
    uploadAvatar,
};
