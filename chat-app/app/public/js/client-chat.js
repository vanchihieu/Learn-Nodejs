const socket = io();

document.getElementById("form-messages").addEventListener("submit", (event) => {
    event.preventDefault();
    const messageText = document.getElementById("input-message").value;
    socket.emit("send message from client to server", messageText);
});

socket.on("send message from server to client", (messageText) => {
    console.log("🚀 ~ socket.on ~ messageText:", messageText);
});
