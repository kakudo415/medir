const router = require("express").Router();
const db = require("../db");
const Dir = require("../models/dir");
const Memo = require("../models/memo");
const Room = require("../models/room");
const error = require("../error");

router.post("/:id", (req, res) => {
  Memo.find(req.params.id).then((memo) => {
    res.send(memo.content);
  }).catch((err) => {
    error(err, res);
  });
});

router.put("/create", (req, res) => {
  Memo.create(req.body.id, req.body.name).then((id) => {
    res.send(201, id);
  }).catch((err) => {
    error(err, res);
  });
});

router.put("/edit/:id", (req, res) => {
  Memo.find(req.params.id).then((memo) => {
    if(!memo) {
      res.render("home", {massage: "That memo does not exist"});
      return;
    }

    if(memo.parent_id != req.body.id) {
      res.render("home", {massage: "I can not get consistency"});
      return;
    }
    console.log(memo);
    console.log(req.body);
    if(req.body.name) memo.name = req.body.name;
    if(req.body.value) memo.content = req.body.value;
    memo.updated_at = new Date();

    memo.update().then(() => {
      res.send(true);
    }).catch((err) => {
      error(err, res);
    });
  });
});

router.delete("/:id", (req, res) => {
  Memo.find(req.params.id).then((memo) => {
    if(!memo) {
      res.render("home", {massage: "That memo does not exist"});
      return;
    }

    if(memo.parent_id != req.body.id) {
      res.render("home", {massage: "I can not get cnsistency"});
      return;
    }

    memo.delete().then(() => {
      res.send(true);
    }).catch((err) => {
      error(err, res);
    });
  });
});

module.exports = router;
