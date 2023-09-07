Khi emit nên dùng cái nào?
1. Dùng socket nếu server chỉ phản hồi cho 1 client (chính là client gửi event lên cho server)
2. Dùng io nếu server muốn phản hồi cho tất cả các client đang kết nối với nó

09. phân biệt socket.emit và socket.broadcast.emit
- socket.emit: gửi câu chào cho client đã gửi sử kiện lên (client vừa tham gia vào server)
- socket.broadcast.emit: gửi câu thông báo cho tất cả client còn lại