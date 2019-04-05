var dotenv     = require('dotenv').config(),
    express    = require("express"),
    nodemailer = require("nodemailer"),
    request    = require("request"),
    router     = express.Router();
    // smtpTransport = require('nodemailer-smtp-transport');
    // flash      = require("connect-flash");

// contact form
router.get("/", function(req, res) {
   res.render("contact", {page: 'contact'});
   console.log("I hit this route!");
});

router.post("/send", function(req, res) {
    console.log("send route");
    console.log("RECAPTCHA SECRET: " + process.env.RECAPTCHA_API_SECRET);
    const captcha = req.body["g-recaptcha-response"];
    if (!captcha) {
      console.log(req.body);
      req.flash("error", "Please select captcha");
      return res.redirect("back");
    }
    // secret key
    var secretKey = process.env.RECAPTCHA_API_SECRET;
    // Verify URL
    var verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_API_SECRET}&response=${captcha}&remoteip=${req
      .connection.remoteAddress}`;
    // Make request to Verify URL
    request.get(verifyURL, (err, response, body) => {
      // if not successful
      if(err){
        console.log(err);
      }
      if (body.success !== undefined && !body.success) {
        req.flash("error", "Captcha Failed");
        return res.redirect("/contact");
      }});
      
        var smtpTransport = require('nodemailer-smtp-transport');
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'pavance40@gmail.com',
              //must go to https://myaccount.google.com/apppasswords then paste the generated password here or transporter will not work
              pass: process.env.GMAILPW1

            }
        });
         
        var mailOptions = {
            from: 'Chris Galvan <pavance40@gmail.com',
            to: 'pavance40@gmail.com',
            replyTo: req.body.email,
            subject: "CPG contact form: " + req.body.name,
            text: 'You have received an email from... Name: '+ req.body.name + ' Phone: ' + req.body.phone + ' Email: ' + req.body.email + ' Message: ' + req.body.message,
            html: '<h3>You have received an email from...</h3><ul><li>Name: ' + req.body.name + ' </li><li>Phone: ' + req.body.phone + ' </li><li>Email: ' + req.body.email + ' </li></ul><p>Message: <br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + req.body.message + ' </p>'
        };
        
  transporter.sendMail(mailOptions, function(err, resp) {
   if (err) {
     console.log(err);
   } else {
     console.log('Email sent');
     res.redirect('/');
     req.flash("Thank you for contacting CPG. We will respond to your inquiry within 24 hours.");
     
     
   }
 });
});

module.exports = router;