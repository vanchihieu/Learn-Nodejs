let userList = [
    {
        id: "1",
        room: "fe01",
        username: "Van Chi Hieu",
    },
    {
        id: "2",
        room: "fe02",
        username: "Van Chi Tam",
    },
];

const addUser = (newUser) => {
    return (userList = [...userList, newUser]);
};

const getUserList = (room) => {
    return userList.filter((user) => user.room === room);
};

const removeUser = (id) => {
    return (userList = userList.filter((user) => user.id !== id));
};

module.exports = {
    getUserList,
    addUser,
    removeUser,
};
