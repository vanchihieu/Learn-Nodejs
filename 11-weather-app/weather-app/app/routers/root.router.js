const express = require("express");
const studentRouter = require("./student.router");
const router = express.Router();

// url = http://localhost:3000/students
router.use('/students',studentRouter);

module.exports = router;
