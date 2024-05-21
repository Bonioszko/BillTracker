const express = require("express");
const router = express.Router();
const {
    test,
    signInUser,
    loginUser,
    logout,
    getProfile,
    forget,
    reset,
} = require("../controllers/authController");
router.get("/", test);
router.get("/profile", getProfile);
router.post("/signin", signInUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.post("/forget", forget);
router.get("/token/:token", reset);
module.exports = router;
