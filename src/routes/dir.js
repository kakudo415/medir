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
        sendData.memo[memos[name].name] = memos[name].id;
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
    res.send(200, id);
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

    if(dir.id != req.body.id) {
      res.render("home", {massage: "I can not get consistency"});
      return;
    }

    dir.name = req.body.rename;


    dir.update().then(() => {
      res.send(true);
    }).catch((err) => {
      error(err, res);
    });
  });
});


router.delete("/:id", (req, res) => {
  Dir.find(req.params.id).then((dir) => {
    console.log(dir);
    if(!dir) {
      res.send(404);
      return;
    }

    if(req.body.id == undefined) req.body.id = 1;
    if(dir.id != req.body.id) {
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
