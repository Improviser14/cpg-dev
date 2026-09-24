require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();


// --------------------------------------------------
// PRODUCTION HTTPS REDIRECT
// --------------------------------------------------

if (process.env.ENVIRONMENT === "prod") {
  app.use((req, res, next) => {
    if (req.get("X-Forwarded-Proto") !== "https") {
      return res.redirect(301, `https://${req.get("host")}${req.originalUrl}`);
    }

    next();
  });
}


// --------------------------------------------------
// APPLICATION CONFIGURATION
// --------------------------------------------------

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// --------------------------------------------------
// MIDDLEWARE
// --------------------------------------------------

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


// --------------------------------------------------
// PAGE ROUTES
// --------------------------------------------------

app.get("/", (req, res) => {
  res.render("cpg");
});

app.get("/services/digital-intelligence", (req, res) => {
  res.render("digital-intelligence");
});

app.get("/services/ai-visibility-geo", (req, res) => {
  res.render("ai-visibility-geo");
});

app.get("/services/optimization-development", (req, res) => {
  res.render("optimization-development");
});

app.get("/digital-performance-audit", (req, res) => {
  res.render("digital-performance-audit");
});

app.get("/work", (req, res) => {
  res.render("work");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});


// --------------------------------------------------
// 404
// --------------------------------------------------

app.use((req, res) => {
  res.status(404).send("Page not found");
});


// --------------------------------------------------
// START SERVER
// --------------------------------------------------

const PORT = process.env.PORT || 8080;

if (process.env.ENVIRONMENT === "prod") {
  app.listen(PORT, () => {
    console.log(`CPG Development running on port ${PORT}`);
  });
} else {
  app.listen(PORT, "127.0.0.1", () => {
    console.log(`CPG Development running at http://127.0.0.1:${PORT}`);
  });
}