// setup the routes for authentication

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const isloggedIn = require("../middlewares/isLoggedIn.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/verify/:token", authController.verify);
router.post("/logout", isloggedIn,authController.logout);
router.get("/getProfile", isloggedIn, authController.getProfile);

module.exports = router;