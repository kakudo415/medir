const express = require("express");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const http = require("http");
const path = require("path");

const rooting = require("./src/rooting");

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(rooting);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(" 'medir' is listening to port :" + server.address().port)
});

module.exports = app;
