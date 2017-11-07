const router = require("express").Router();
const db = require("../db");
const Room = require("../models/room");


router.get("/", (req, res) => {
  res.render("home");
})

router.post("/", (req, res) => {
  res.redirect(`/room/${req.body.name}`);
})

router.post("/create", (req, res) => {
  Room.find(req.body.name).then((room) => {
    if(room) res.render("/", {massage: "Already exist"});
    else {
      Room.create(req.body.name).then(() => {
        res.redirect(`/room/${req.body.name}`);
      });
    }
  });
})

module.exports = router;
