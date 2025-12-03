const express = require('express');
const router = express.Router();

const {
    createOtherService,
    getAllOtherServices,
    getOneOtherService,
    updateOtherService,
    deleteOtherService
} = require('../controller/otherServicesController');

router.post("/", createOtherService);
router.get("/", getAllOtherServices);
router.get("/:id", getOneOtherService);
router.put("/:id", updateOtherService);
router.delete("/:id", deleteOtherService);

module.exports = router;
