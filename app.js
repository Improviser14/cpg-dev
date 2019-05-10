var dotenv     = require('dotenv').config(),
    express = require('express'),
    // liveServer = require("live-server"),
    // particlesJS = require("particles.js"),
    app     = express(),
    bodyParser = require('body-parser'),
    nodemailer = require("nodemailer"),
    request    = require("request"),
    cookieParser = require("cookie-parser"),
    router     = express.Router(),
    session = require("express-session"),
    flash      = require("connect-flash"),
    contactRoutes = require("./routes/contact"),
    serveStatic = require('serve-static');
    

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(flash());

//  particlesJS.load('particles-js', '/particles.json', function() {
//   console.log('callback - particles.js config loaded');
//  });



app.set('view engine', 'ejs');

app.use("/", router);

app.use(express.static('public/'));

app.get('/contact', function(req, res){
    res.render('contact');
});

app.get('/', function(req, res){
    res.render('cpg');
});

app.get('/pricing', function(req, res){
    res.render('pricing');
});

app.get('/preferences', function(req, res){
    res.render('preferences');
});

app.use("/contact", contactRoutes);
 
app.use(flash());

app.listen(process.env.PORT, process.env.IP);

