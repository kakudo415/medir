const express = require("express");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const http = require("http");
const path = require("path");

const rooting = require("./src/rooting");

const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

let mysqlOption = {
  host: "localhost",
	port: 3306,
	user: "root",
	database: "medir"
};

app.use(session({
  secret: "cat. cat. cat.",
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(mysqlOption),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30
  }
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(rooting);

let server = app.listen(process.env.PORT || 3000, () => {
  console.log(" 'medir' is listening to port :" + server.address().port)
});

module.exports = app;
