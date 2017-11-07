const router = require("express").Router();
const db = require("../db");
const Room = require("../models/room");


router.get("/", (req, res) => {
  res.render("home");
})

module.exports = router;
