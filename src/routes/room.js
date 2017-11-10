const router = require("express").Router();
const db = require("../db");
const Dir = require("../models/dir");
const Memo = require("../models/memo");
const Room = require("../models/room");
const error = require("../error");

router.get("/:name", (req, res) => {
  Room.find(req.params.name).then((room) => {
    if(room) res.render("files");
    else res.render("home", {massage: "That room name does not exist"});
  }).catch((err) => {
    error(err, res);
  });
});

router.post("/:name", (req, res) => {
  Room.find(req.params.name).then((room) => {
    if(!room) {
      res.render("home", {massage: "That room does not exist"});
      return;
    }
    let sendData = {dir: {}, memo: {}, id: room.root_id};
    Dir.childFinds(room.root_id).then((dirs) => {
      for(name in dirs) {
        sendData.dir[dirs[name].name] = {id: dirs[name].id};
      }
      Memo.commonParentFinds(room.root_id).then((memos) => {
        for(name in memos) {
          sendData.memo[memos[name].name] = memos[name].id;
        }
        console.log(sendData);
        res.send(sendData);
      }).catch((err) => {
        error(err, res);
      });
    }).catch((err) => {
      error(err, res);
    });
  }).catch((err) => {
    error(err, res);
  });
});

module.exports = router;
