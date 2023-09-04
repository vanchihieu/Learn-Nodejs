const express = require("express");
const router = require("./routers/root.router");
const { sequelize } = require("./model");
const app = express();
const port = 3000;

// luu y: chuyen req, res ve json
app.use(express.json());

app.use(router);

app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(port, () => {
    console.log("server run localhost port 3000");
});

// setup sequelize
sequelize.sync({ alter: true }); // sửa bảng cũ đi và tạo bảng mới
