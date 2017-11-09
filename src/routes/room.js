const router = require("express").Router();
const db = require("../db");
const Room = require("../models/room");


router.get("/:name", (req, res) => {
  Room.find(req.params.name).then((room) => {
    if(room) res.render("files");
    else res.render("home", {massage: "That room name does not exist"});
  });
});

router.post("/:name/dir/:id", (req, res) => {

});

module.exports = router;
