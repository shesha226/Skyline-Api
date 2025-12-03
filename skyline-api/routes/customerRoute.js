const express = require('express');
const router = express.Router();

const {
    createCustomer,
    getAllCustomers,
    getOneCustomer,
    updateCustomer,
    deleteCustomer
} = require('../controller/customerController');

router.post("/", createCustomer);
router.get("/", getAllCustomers);
router.get("/:id", getOneCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;
