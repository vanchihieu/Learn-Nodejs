const express = require("express");
const {
    register,
    login,
    uploadAvatar,
} = require("../controllers/user.controllers");
const { uploadImage } = require("../middlewares/upload/upload-image");
const { authenticate } = require("../middlewares/auth/authenticate");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

// upload file

userRouter.post("/upload-avatar", authenticate, uploadImage('avatar'), uploadAvatar);

module.exports = {
    userRouter,
};
