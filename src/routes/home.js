const router = require("express").Router();
const db = require("../db");
const Room = require("../models/room");


router.get("/", (req, res) => {
  res.render("home");
})

router.post("/", (req, res) => {
  Room.find(req.body.name).then((room) => {
    if(room) res.redirect(`/room/${req.body.name}`);
    else {
      res.render("home", {massage: "That room does not exist"});
    }
  }).catch((err) => {
    error(err, res);
  });
});

router.post("/create", (req, res) => {
  Room.find(req.body.name).then((room) => {
    if(room) res.render("home", {massage: "Already exist"});
    else {
      Room.create(req.body.name).then(() => {
        res.redirect(`/room/${req.body.name}`);
      }).catch((err) => {
        error(err, res);
      });
    }
  }).catch((err) => {
    error(err, res);
  });
});


function error(err, res) {
  console.log(err);
  res.render("home", {massage: "internal server error try again later"});
}

module.exports = router;
