const socket = io();

document.getElementById("form-messages").addEventListener("submit", (event) => {
    event.preventDefault();
    const messageText = document.getElementById("input-message").value;
    const acknowledgements = (errors) => {
        if (errors) {
            return alert("tin nhắn không hợp lệ");
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

// Gửi vị trí
document.getElementById("btn-share-location").addEventListener("click", () => {
    if (!navigator.geolocation) {
        return alert("Trình duyệt đang dùng không có hỗ trợ tìm vị trí");
    }
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("share location from client to server", {
            latitude,
            longitude,
        });
    });
});

socket.on("share location from server to client", (linkLocation) => {
    console.log("🚀 ~ linkLocation:", linkLocation);
});

// xử lý query string
const queryString = location.search;

const params = Qs.parse(queryString, {
    ignoreQueryPrefix: true,
});

const { room, username } = params;

// Hiển thị tên phòng lên màn hình
document.getElementById("app_title").innerHTML = room;

socket.emit("join room from client to server", { room, username });

// Xử lý user list
socket.on("send user list from server to client", (userList) => {
    let contentHtml = "";
    userList.map((user) => {
        contentHtml += `
        <li class="app__item-user">
        ${user.username}
        </li>
        `;
    });
    document.getElementById("app__list-user--content").innerHTML = contentHtml;
});
