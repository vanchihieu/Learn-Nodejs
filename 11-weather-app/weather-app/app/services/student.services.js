const { Student } = require("../model");

let studentList = [
    {
        id: "1",
        fullName: "Van Chi Hieu",
        age: 18,
        numberClass: 12,
    },
    {
        id: "2",
        fullName: "Van Chi Tam",
        age: 26,
        numberClass: 12,
    },
    {
        id: "4",
        fullName: "Van Nhan",
        age: 26,
        numberClass: 12,
    },
    {
        id: "3",
        fullName: "Nguyen Thi Em",
        age: 18,
        numberClass: 12,
    },
];

const getList = async () => {
    const studentList = await Student.findAll();
    if (studentList) {
        return studentList;
    } else {
        return false;
    }
};

const getDetail = async (id) => {
    const student = await Student.findOne({
        where: {
            id,
        },
    });
    if (student) {
        return student;
    } else {
        return false;
    }
};

const create = async (student) => {
    const newStudent = await Student.create(student);

    return newStudent;
};

const update = async (id, fullName, age, numberClass) => {
    const studentUpdate = await getDetail(id);

    if (studentUpdate) {
        studentUpdate.fullName = fullName;
        studentUpdate.age = age;
        studentUpdate.numberClass = numberClass;
        const studentUpdated = await studentUpdate.save();
        return studentUpdated;
    } else {
        return false;
    }
};

const deleteById = (id) => {
    const index = studentList.findIndex((student) => student.id == id);
    if (index !== -1) {
        const studentDelete = studentList[index];
        studentList.splice(index, 1);
        // studentList = studentList.filter((student) => student.id !== id);
        return studentDelete;
    } else {
        return false;
    }
};
module.exports = {
    getList,
    getDetail,
    create,
    update,
    deleteById,
};
