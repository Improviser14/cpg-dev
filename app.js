var dotenv = require("dotenv").config(),
  express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  nodemailer = require("nodemailer"),
  request = require("request"),
  cookieParser = require("cookie-parser"),
  router = express.Router(),
  session = require("express-session"),
  flash = require("connect-flash"),
  contactRoutes = require("./routes/contact"),
  serveStatic = require("serve-static");

//ssl must be configured on the application level --here
//uncomment this block when deploying see code at the bottom of this file
if (process.env.ENVIRONMENT === "prod") {
  app.use(function (req, res, next) {
    if (req.get("X-Forwarded-Proto") !== "https") {
      res.redirect("https://" + req.get("Host") + req.url);
    } else next();
  });
}

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(flash());

app.set("view engine", "ejs");

app.use("/", router);

app.use(express.static("public/"));

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.get("/", function (req, res) {
  res.render("cpg");
});

app.get("/yourProject", function (req, res) {
  res.render("yourProject");
});

app.get("/examplesOfOurWork", function (req, res) {
  res.render("examplesOfOurWork");
});

app.use("/contactUs", contactRoutes);

app.use(flash());

if (process.env.ENVIRONMENT === "prod") {
  // sets port 8080 to default or unless otherwise specified in the environment
  app.set("port", process.env.PORT || 80);
  app.listen(app.get("port"));
} else {
  app.listen(8080, "127.0.0.1");
}
