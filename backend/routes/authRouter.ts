const express = require("express");
const router = express.Router();
const {
    test,
    signInUser,
    loginUser,
    logout,
} = require("../controllers/authController");
router.get("/", test);
router.post("/signin", signInUser);
router.post("/login", loginUser);
router.post("/logout", logout);
module.exports = router;
