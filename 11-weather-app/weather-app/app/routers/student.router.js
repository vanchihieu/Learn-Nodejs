const express = require("express");
const studentRouter = express.Router();

const {
    getStudentList,
    getStudentDetailById,
    createStudent,
    updateStudentById,
    deleteStudentById,
} = require("../controllers/student.controllers");
const { logFeature } = require("../middlewares/logger/log-feature");
const {
    checkEmpty,
    checkNumberClass,
} = require("../middlewares/validations/student.validation");

// lay danh sach hoc sinh
studentRouter.get("/", logFeature, getStudentList);

// Lay thong tin chi tiet hoc sinh
studentRouter.get("/:id", getStudentDetailById);

// them hoc sinh
studentRouter.post("/", checkEmpty, checkNumberClass, createStudent);

// cap nhat hoc sinh
studentRouter.put("/:id", checkEmpty, checkNumberClass, updateStudentById);

// xoa hoc sinh
studentRouter.delete("/:id", deleteStudentById);

module.exports = studentRouter;
