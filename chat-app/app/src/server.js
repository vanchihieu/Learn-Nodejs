const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const Filter = require("bad-words");
const { createMessage } = require("./utils/create-messages");
const { getUserList, userList } = require("./utils/users");
const publicPathDirectory = path.join(__dirname, "../public");
app.use(express.static(publicPathDirectory));

const server = http.createServer(app);
const io = socketIo(server);

let count = 1;
const message = "Hi everyone";

// lang nghe su kien ket noi tu client (client ket noi voi server)
// => Emit: gửi sự kiện
// => On: lắng nghe sự kiện

io.on("connection", (socket) => {
    socket.on("join room from client to server", ({ room, username }) => {
        socket.join(room);

        // chào
        // gửi cho client vừa kết nối vào
        socket.emit(
            "send message from server to client",
            createMessage(`Chào mừng bạn đến với phòng ${room}`)
        );

        // gửi cho các client còn lại trừ client vừa mới gửi sự kiện
        socket.broadcast
            .to(room) // tóm lại trước khi emit bạn thêm .to(room) vào để biết là mình sẽ gửi event tới room nào.
            .emit(
                "send message from server to client",
                createMessage(
                    `Client ${username} mới vừa tham gia vào phòng ${room} `
                )
            );

        // chat
        socket.on(
            "send message from client to server",
            (messageText, callback) => {
                const filter = new Filter();
                if (filter.isProfane(messageText)) {
                    return callback(
                        "message không hợp lệ vì có những từ không phù hợp!"
                    );
                }

                io.to(room).emit(
                    "send message from server to client",
                    createMessage(messageText)
                );
                callback();
            }
        );

        // xử lý location chia sẻ vị trí
        socket.on(
            "share location from client to server",
            ({ latitude, longitude }) => {
                const linkLocation = `https://www.google.com/maps?q=${latitude},${longitude}`;
                io.to(room).emit(
                    "share location from server to client",
                    linkLocation
                );
            }
        );

        // Xử lý userList
        io.to(room).emit("send user list from server to client", getUserList(room));
    });

    // ngat ket noi
    socket.on("disconnect", () => {
        console.log("client left server");
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`app run on http://localhost:${port}`);
});

// run server -> npm run dev
