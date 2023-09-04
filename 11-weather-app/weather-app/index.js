const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("task_management", "root", "123456", {
    host: "localhost",
    dialect: "mysql",
});

// create model
const Task = sequelize.define("Task", {
    name: {
        type: DataTypes.STRING, // varchar(255)
        allowNull: false, // not null
    },
    status: {
        type: DataTypes.STRING,
    },
});

const createTask = async (name, status) => {
    // c1
    // const newTask = Task.build({
    //     name,
    //     status,
    // });
    // await newTask.save();

    // c2
    const newTask = await Task.create({
        name,
        status,
    });
};

// createTask("Hoc ReactJs", "pending");

const getAllTask = async () => {
    const taskList = await Task.findAll();
    console.log(
        "🚀 ~ getAllTask ~ taskList:",
        JSON.stringify(taskList, null, 2)
    );
};

// getAllTask();

const getTaskById = async (id) => {
    const task = await Task.findOne({
        where: {
            id,
        },
    });
    console.log("🚀 ~ getTaskById ~ task:", JSON.stringify(task, null, 2));
};

// getTaskById(6);

const updateTaskById = async (id, data) => {
    await Task.update(data, {
        where: {
            id,
        },
    });
};

// updateTaskById(3, {
//     name: "Be Em",
//     status: "OPEN",
// });

const deleteTaskById = async (id) => {
    await Task.destroy({
        where: {
            id,
        },
    });
};

deleteTaskById(8);

// đồng bộ model
// Khi chúng ta tạo model ở sequelize thì table trong database cũng đc tạo ra tương tự
const syncModel = async () => {
    await Task.sync({ force: true }); // xóa bảng cũ đi và tạo bảng mới
    // await Task.sync({alter: true}) // sửa bảng cũ đi và tạo bảng mới
    console.log("da dong bo model task");
};

// syncModel();

const checkConnect = async () => {
    try {
        await sequelize.authenticate();
        console.log("Ket noi thanh cong");
    } catch (error) {
        console.log("🚀 ~ checkConnect ~ error:", error);

        console.log("ket noi that bai");
    }
};

checkConnect();
