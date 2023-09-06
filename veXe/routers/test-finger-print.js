const express = require("express");

const fingerPrintRouter = express.Router();

fingerPrintRouter.get("/", (req, res) => {
    res.send(req.fingerprint);
});

module.exports = {
    fingerPrintRouter,
};
