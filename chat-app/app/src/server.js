const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");

const publicPathDirectory = path.join(__dirname, "../public");
app.use(express.static(publicPathDirectory));

const server = http.createServer(app);
const io = socketIo(server);

// lang nghe su kien ket noi tu client
io.on("connection", (socket) => {
    console.log("new client connect");

    // ngat ket noi
    socket.on('disconnect', ()=>{
        console.log('client left server');
    })
});

const port = 3000;
server.listen(port, () => {
    console.log(`app run on http://localhost:${port}`);
});

// run server -> npm run dev
