const userList = [
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

const getUserList = (room) => {
    return userList.filter((user) => user.room === room);
};

module.exports = {
    getUserList,
};
