// Import Librarlies
const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/auth");

// initiallise the  auth route
router.route("/login").post(login);
router.route("/register").post(register);

//expor the module
module.exports = router;