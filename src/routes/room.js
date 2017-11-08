const router = require("express").Router();
const db = require("../db");
const Room = require("../models/room");


router.get("/:name", (req, res) => {
  res.render("files");
})

router.post("/:name/dir/:id", (req, res) => {

});

module.exports = router;
