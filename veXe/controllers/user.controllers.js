const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
    const { name, email, password, numberPhone } = req.body;
    try {
        // tao ra 1 chuoi ngau nhien
        const salt = bcrypt.genSaltSync(10);

        // mã hóa salt + password
        const hashPassword = bcrypt.hashSync(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            numberPhone,
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

    // b2 : kiểm mật khẩu có đúng hay không
    if (user) {
        const isAuth = bcrypt.compareSync(password, user.password);

        if (isAuth) {
            const token = jwt.sign(
                { email: user.email, type: user.type },
                "chi-hieu-key",
                { expiresIn: 60 * 60 }
                // payload -> secret key -> time
            );
            res.status(200).send({ message: "Dang nhap thanh cong !,", token });
        } else {
            res.status(500).send({
                message: "Tai khoan hoac mat khau khong dung",
            });
        }
    } else {
        res.status(404).send({ message: "Không tìm thấy email phù hợp" });
    }
};

module.exports = {
    register,
    login,
};

// npx sequelize --help
//npx sequelize db:migrate --name create-user
