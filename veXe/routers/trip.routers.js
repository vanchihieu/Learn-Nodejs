const express = require("express");
const {
    createTrip,
    getAllTrip,
    deleteTrip,
    updateTrip,
} = require("../controllers/trip.controllers");
const tripRouters = express.Router();

tripRouters.post("/", createTrip);
tripRouters.get("/", getAllTrip);
tripRouters.delete("/:id", deleteTrip);
tripRouters.put("/:id", updateTrip);
module.exports = {
    tripRouters,
};
