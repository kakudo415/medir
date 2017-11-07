const app = require("express")();
const routes = require("./routes");

app.use("/", routes.home);
app.use("/room", routes.room);

module.exports = app;
