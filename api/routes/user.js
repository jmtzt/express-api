const express = require("express");
const router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserController = require("../controllers/user");

router.post("/signup", UserController.signup);

router.post("/login", UserController.login);

router.post("/getUser", UserController.getUser)

module.exports = router;
