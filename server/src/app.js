const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
// connection to the mongodb.
const mongoose = require("mongoose");
const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB = process.env.MONGO_DB;

mongoose.connect(`mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`, 
{useNewUrlParser: true, useUnifiedTopology: true});

const indexRouter = require("./routes/index");
const historyRouter = require("./routes/history");
const saveFileRouter = require("./routes/save");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const openFileRouter = require("./routes/openFile");
const getIndexRouter = require("./routes/getIndex");
const getThemeRouter = require("./routes/getTheme");
const setThemeRouter = require("./routes/setTheme");
const getPasswordRouter = require("./routes/getPassword");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// all the routes being used by the app.
app.use("/", indexRouter);
app.use("/history", historyRouter);
app.use("/save", saveFileRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/openfile", openFileRouter);
app.use("/getindex", getIndexRouter);
app.use("/gettheme", getThemeRouter);
app.use("/settheme", setThemeRouter);
app.use("/getpassword", getPasswordRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
