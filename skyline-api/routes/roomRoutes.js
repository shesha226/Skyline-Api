const express = require('express');
const router = express.Router();

const {
    createRoom,
    getAllRooms,
    getOneRoom,
    updateRoom,
    deleteRoom
} = require('../controller/roomsController');

router.post("/", createRoom);
router.get("/", getAllRooms);
router.get("/:id", getOneRoom);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);

module.exports = router;
