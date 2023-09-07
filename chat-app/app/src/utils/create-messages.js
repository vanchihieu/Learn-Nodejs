const formatTime = require("date-format");

const createMessage = (messagesText) => {
    return {
        messagesText,
        createAt: formatTime("dd/MM/yyyy - hh:mm:ss", new Date()),
    };
};

module.exports = {
    createMessage,
};
