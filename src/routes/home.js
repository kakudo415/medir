const router = require("express").Router();
const db = require("../db");

router.get("/", (req, res) => {
  res.render("home");
})

router.post("/", (req, res) => {
  res.redirect(`/room/${req.body.name}`);
})

router.post("/create", (req, res) => {

})

module.exports = router;
