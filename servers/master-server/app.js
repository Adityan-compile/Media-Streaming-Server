const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const usersRouter = require("./routes/users");
const indexRouter = require("./routes/index");
const db = require("./config/database/sequelize");
const migrate = require("./config/database/migrate");
const {loadServerSettings} = require("./utils/settings");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({
  optionsSuccessStatus: 200
}));

// Run Migrations and Load Server Settings
migrate((e)=>{
  if(e){
    console.error(e);
    throw new Error("Migration Failed" + "\n" + e);
  }
  console.log("Migration Successful");
  
  loadServerSettings().then(()=>{
    return console.info("Server Settings Loaded");
  }).catch((e)=>{
    throw new Error("Error Loading Server Config" + "\n" + e);
  });
});


app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render({
    status: err.status,
    message:
      req.app.get("env") === "development" ? err.message : "Server Error",
  });
});

module.exports = app;
