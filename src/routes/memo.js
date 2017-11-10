const router = require("express").Router();
const db = require("../db");
const Dir = require("../models/dir");
const Memo = require("../models/memo");
const Room = require("../models/room");
const error = require("../error");

router.post("/:id", (req, res) => {
  Memo.find(req.params.id).then((memo) => {
    if(!memo) res.send(404);
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
      res.send(404);
      return;
    }

    if(memo.parent_id != req.body.id) {
      res.send(400)
      return;
    }

    if(req.body.rename) memo.name = req.body.rename;
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
      res.send(404);
      return;
    }

    if(req.body.id == undefined) req.body.id = 1;
    if(memo.parent_id != req.body.id) {
      res.send(400);
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
