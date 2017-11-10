const router = require("express").Router();
const db = require("../db");
const Dir = require("../models/dir");
const Memo = require("../models/memo");
const Room = require("../models/room");
const error = require("../error");

router.post("/:id", (req, res) => {
  let sendData = {id: req.params.id, dir: {}, memo: {}}
  Dir.childFinds(req.params.id).then((dirs) => {
    for(name in dirs) {
      sendData.dir[dirs[name].name] = {id: dirs[name].id};
    }
    Memo.commonParentFinds(req.params.id).then((memos) => {
      for(name in memos) {
        sendData.memo[dirs[name].name] = memos[name].id;
      }

      res.send(sendData);
    }).catch((err) => {
      error(err, res);
    });
  }).catch((err) => {
    error(err);
  });
});

router.put("/create", (req, res) => {
  Dir.create(req.body.id, req.body.name).then((id) => {
    res.send(201, id);
  }).catch((err) => {
    error(err, res);
  });
});

router.put("/edit/:id", (req, res) => {
  Dir.find(req.params.id).then((dir) => {
    if(!dir) {
      res.render("home", {massage: "That directory does not exist"});
      return;
    }

    if(dir.parent_id != req.body.id) {
      res.render("home", {massage: "I can not get consistency"});
      return;
    }

    dir.name = req.body.name;

    dir.update().then(() => {
      res.send(true);
    }).catch((err) => {
      error(err, res);
    });
  });
});


router.delete("/:id", (req, res) => {
  Dir.find(req.params.id).then((dir) => {
    if(!dir) {
      res.render("home", {massage: "That directory does not exist"});
      return;
    }
    console.log(dir);
    console.log(req.body.id);
    if(dir.parent_id != req.body.id) {
      res.render("home", {massage: "I can not get cnsistency"});
      return;
    }

    dir.delete().then(() => {
      res.send(true);
    }).catch((err) => {
      error(err, res);
    });
  });
});

module.exports = router;
