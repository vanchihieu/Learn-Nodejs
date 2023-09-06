const express = require("express");
const { stationRouter } = require("./station.routers");
const { userRouter } = require("./user.routers");
const { tripRouter } = require("./trip.routers");
const { fingerPrintRouter } = require("./test-finger-print");

const rootRouter = express.Router();

rootRouter.use("/stations", stationRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/trips", tripRouter);
rootRouter.use("/test-finger-print", fingerPrintRouter);

module.exports = {
    rootRouter,
};
