const app = require("express")();
const routes = require("./routes");

app.use("/", routes.home);

module.exports = app;
