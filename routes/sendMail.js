const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const nodemailer = require("nodemailer");
const mailing = require("./api/emailDependency")

  router.post('/', [
    check('to').notEmpty().withMessage('Please enter a valid email address'),
    check('subject', 'Please enter Subject').notEmpty()
      .isLength({ min: 2}).withMessage('Please enter valid Subject'),
    check('text', 'Please enter message').notEmpty()
      .isLength({ min: 2}).withMessage('Please enter valid message')
  ], async (req, res) => {
    try {

        const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      if(sendEmail(req.body.to,req.body.subject,req.body.text)==="email sent"){
        res.send("Email Sent");
      }

    } catch (err) {
      res.send("server error");
    }
  });
async function sendEmail(to,subject,content){
    let transporter = nodemailer.createTransport({
      service:'gmail',
      auth:{
          user:'noreply.humbercfe@gmail.com',
          pass:'HumberCfe@2020'
      }
    });
    //check if admin email is already in the database
    //create new admin
    var emails = to;
    emails = emails.split(',');
    for(const email of emails){
      var message = {
          from: "noreply.humbercfe@gmail.com",
          to: email,
          subject: subject,
          html: content
        };
        let info = await transporter.sendMail(message);
        console.log(info);
        return "email sent";
      }
    }
  

module.exports = router;