var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const eventsRouter = require("./routes/events");

const User = require("./models/user");
const Event = require("./models/event");

var app = express();

var mongoose = require("mongoose");
var dev_db_url =
    "mongodb+srv://Marcel_Wifi:2711998Maner@diplomabackendcluster1.bmswe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.use(cors());

app.post("/api/register", async (req, res) => {
    console.log(req.body);
    res.json({ status: ok });

    const { username, password: plainTextPassword } = req.body;

    try {
        const response = await User.create({
            username,
            password,
        });
        console.log("User has been created", response);
    } catch (error) {
        console.log(error);
        return res.json({ status: "error" });
    }
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/events", eventsRouter);

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
