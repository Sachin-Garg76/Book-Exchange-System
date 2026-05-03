const express = require("express");
const { sendMessage, getMessages } = require("../controllers/contactController");

const router = express.Router();

router.post("/contact", sendMessage);
router.get("/contact", getMessages);

module.exports = router; 