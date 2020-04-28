const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const nodemailer = require("nodemailer");

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
          text: content
        };
        let info = await transporter.sendMail(message);
        return "email sent";
      }
    }