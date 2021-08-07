var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("./database/cnx");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var autreRouter = require("./routes/autres");
var ressourcesRouter = require("./routes/ressources");
var promandatRouter = require("./routes/proMandats");
var tendanceRouter = require("./routes/tendances");
var contactRouter = require("./routes/contact");
var urlRouter = require("./routes/url");
var admResRouter = require("./routes/admRessources");
var admTendances = require("./routes/admTendances");
var admPromandats = require("./routes/admPromandats");
var adminRouter = require("./routes/admin");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/", autreRouter);
app.use("/contact", contactRouter);
app.use("/url", urlRouter);
app.use("/ressources/", ressourcesRouter);
app.use("/", promandatRouter);
app.use("/tendances", tendanceRouter);

/** admn */
app.use("/admin", adminRouter);
app.use("/admin", admResRouter);
app.use("/admin", admPromandats);
app.use("/admin", admTendances);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
