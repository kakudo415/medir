function error(err, res) {
  console.log(err);
  res.render("home", {massage: "internal server error try again later"});
}

module.exports = error;
