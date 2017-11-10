const app = require("express")();
const routes = require("./routes");

app.use("/", routes.home);
app.use("/room", routes.room);
app.use("/room/:name/dir", routes.dir);
app.use("/room/:name/memo", routes.memo);

module.exports = app;
