const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");

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
    socket.on("send message from client to server", (messageText) => {
        io.emit('send message from server to client', messageText)
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
