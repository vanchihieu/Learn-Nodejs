const socket = io();

document.getElementById("form-messages").addEventListener("submit", (event) => {
    event.preventDefault();
    const messageText = document.getElementById("input-message").value;
    const acknowledgements = (errors) => {
        if(errors){
            return alert('tin nhắn không hợp lệ')
        }
        console.log(" gui tin nhan thanh cong");
    };

    socket.emit(
        "send message from client to server",
        messageText,
        acknowledgements // được gọi khi hàm trên server chạy
    );
});

socket.on("send message from server to client", (messageText) => {
    console.log("🚀 ~ socket.on ~ messageText:", messageText);
});
