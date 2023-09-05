
const mkdirp = require("mkdirp");
const multer = require("multer");

const uploadImage = (type) => {
    const made = mkdirp.sync(`./public/images/${type}`);

    // upload file
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            // cb == callBackFunction(errors, value) {}
            cb(null, `./public/images/${type}`); // setup chỗ cần lưu file
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "_" + file.originalname); // đặt lại tên cho file
        },
    });
    const upload = multer({
        storage: storage,
        fileFilter: function (req, file, cb) {
            const extensionImageList = [".png", ".jpg"];
            const extension = file.originalname.slice(-4);
            const check = extensionImageList.includes(extension);
            if (check) {
                cb(null, true);
            } else {
                cb(new Error("extension không hợp lệ"));
            }
        },
    });

    return upload.single(type);
};

module.exports = {
    uploadImage,
};
