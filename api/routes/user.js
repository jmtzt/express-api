const express = require("express");
const router = express.Router();
const User = require("../models/user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserController = require("../controllers/user");

router.post("/signup", UserController.signup);

router.post("/login", UserController.login);

module.exports = router;
