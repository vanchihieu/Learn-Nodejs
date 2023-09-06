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
    console.log("new client connect");

    // nhận lại sự kiện từ client
    socket.on("send increment client to server", () => {
        count++;
        // truyền count từ server về client
        // socket.emit("send count server to client", count);
        io.emit("send count server to client", count);
    });

    // truyền count từ server về client
    socket.emit("send count server to client", count);
    socket.emit("send message server to client", message);

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
