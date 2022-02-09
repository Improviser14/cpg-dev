const express = require("express"),
  nodemailer = require("nodemailer"),
  req = require("request"),
  router = express.Router();

// contact form
router.get("/", function (req, res) {
  res.render("contact/yourProject", { page: "contact" });
});

// mailgun email server config

const smtpTransport = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 465,
  secure: true, // true only for port 465
  auth: {
    user: process.env.LOGIN,
    pass: process.env.SECRET
  }
});

// console.log(smtpTransport);

async function run() {
  let sendResult = await smtpTransport.sendMail({
    from: "cpgdev@cpgdev.net",
    to: "navlag@tutanota.com",
    subject: "hard coded testing email",
    text: "Build me something awesome!!",
    html: "<body><h2>Hello! Build me something awesome!!</h2><p>This is a test message from CPG Development</p></body>"
  });

  // let mailOptions = {
  //   from: req.body.name + " <cpgdev@cpgdev.net",
  //   to: "navlag@tutanota.com",
  //   replyTo: req.body.email,
  //   subject: "CPG website request from: " + req.body.name,
  //   text:
  //     "You have received an email from... Name: " +
  //     req.body.name +
  //     " Phone: " +
  //     req.body.phone +
  //     " Email: " +
  //     req.body.email +
  //     " Message: " +
  //     req.body.message,
  //   html:
  //     "<h3>You have received an email from...</h3><ul><li>Name: " +
  //     req.body.name +
  //     " </li><li>Phone: " +
  //     req.body.phone +
  //     " </li><li>Email: " +
  //     req.body.email +
  //     " </li></ul><p>Message: <br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
  //     req.body.message +
  //     " </p>"
  // };

  console.log(sendResult);
  console.log("made it to the end of the async function");
}
run().catch((err) => console.error(err));

// router.post("/send", function (req, res) {
//   smtpTransport.sendMail(mailOptions, function (err, info) {
//     if (err) {
//       console.log(err);
//       req.flash("error", "Something went wrong... Please try again later!");
//       res.redirect("/contact");
//     } else {
//       req.flash(
//         "success",
//         "Your email has been sent, we will respond within 24 hours."
//       );
//       res.redirect("/");
//     }
//   });
// });
