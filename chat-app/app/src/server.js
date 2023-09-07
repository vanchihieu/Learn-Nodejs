const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const Filter = require("bad-words");

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
    // gửi cho client vừa kết nối vào
    socket.emit(
        "send message from server to client",
        "Chào mừng bạn đến với App Chat"
    );

    // gửi cho các client còn lại trừ client vừa mới gửi sự kiện
    socket.broadcast.emit(
        "send message from server to client",
        "có 1 client mới vừa tham gia vào app chat "
    );

    socket.on("send message from client to server", (messageText, callback) => {
        const filter = new Filter();
        if (filter.isProfane(messageText)) {
            return callback(
                "message không hợp lệ vì có những từ không phù hợp!"
            );
        }

        io.emit("send message from server to client", messageText);
        callback();
    });

    // xử lý location chia sẻ vị trí
    socket.on(
        "share location from client to server",
        ({ latitude, longitude }) => {
            const linkLocation = `https://www.google.com/maps?q=${latitude},${longitude}`;
            io.emit("share location from server to client", linkLocation);
        }
    );

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
