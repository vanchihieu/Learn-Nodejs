const {
    getList,
    getDetail,
    create,
    update,
    deleteById,
    log,
} = require("../services/student.services");

const getStudentList = async (req, res) => {
    const studentList = await getList();
    if (studentList) {
        res.status(200).send(studentList);
    } else {
        res.status(404).send("Not found!");
    }
};

const getStudentDetailById = async (req, res) => {
    const { id } = req.params;
    const student = await getDetail(id);
    if (student) {
        res.status(200).send(student);
    } else {
        res.status(404).send("Not found!");
    }
};

const createStudent = async (req, res) => {
    const student = req.body;
    const studentCreate = await create(student);
    if (studentCreate) {
        res.status(200).send(studentCreate);
    } else {
        res.status(404).send("Not found!");
    }
};

const updateStudentById =  async(req, res) => {
    const { id } = req.params;
    const { fullName, age, numberClass } = req.body;
    const studentUpdate = await update(id, fullName, age, numberClass);
    if (studentUpdate) {
        res.status(200).send(studentUpdate);
    } else {
        res.status(404).send("Not found!");
    }
};

const deleteStudentById = (req, res) => {
    const { id } = req.params;
    const studentDelete = deleteById(id);
    if (studentDelete) {
        res.status(200).send(studentDelete);
    } else {
        res.status(404).send("Not found!");
    }
};
module.exports = {
    getStudentList,
    getStudentDetailById,
    createStudent,
    updateStudentById,
    deleteStudentById,
};
