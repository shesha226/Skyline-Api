const express = require('express');
const router = express.Router();


const {
    registerUser,
    loginUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    generateResetToken
} = require('../controller/UserController');

const { authMiddleware, adminOnly } = require('../middleware/authMiddleware');


//public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/generate-reset-token", generateResetToken);

//protected routes
router.get("/", authMiddleware, adminOnly, getAllUsers);
router.get("/:id", authMiddleware, getUser);
router.put("/update/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, adminOnly, deleteUser);

module.exports = router;
