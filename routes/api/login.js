const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const generator = require('generate-password');
const nodemailer = require("nodemailer");

let Admin = require('../../models/Admin');
let Judge = require('../../models/Judge');
let Student = require('../../models/Student');



router.post('/admin', [
    check('email', 'Please enter valid email').isEmail(),
    check('password').notEmpty().withMessage('Please enter a password.')
],
    async (req, res) => {
        //Check for errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        try {
            //check if user email is already in the database
            let admin1 = await Admin.findOne({ email: req.body.email });

            if (admin1) {
                let hash = admin1.password;
                bcrypt.compare(req.body.password, hash, function (err, result) {
                    if (result) {
                        //generate token
                        const payload = {
                            admin: {
                                id: admin1.id,
                            }
                        };

                        jwt.sign(
                            payload,
                            config.get('jwtsecret'),
                            { expiresIn: 360000 },
                            (err, token) => {
                                if (err) throw err;
                                res.json({ token });
                            }
                        );
                    }
                    else {
                        return res.status(400).json({ errors: [{ msg: 'Incorrect password, please try again or click on forgot password.'
                        ,param: "password" }] });
                    }
                });
            } else {
                return res.status(400).json({ errors: [{ msg: 'Admin does not exists.', param:'NotFound' }] });
            }

        } catch (err) {
            res.status(500).send(err.message);
        }
    });



//Judge authentication
router.post('/judge', [
    check('email', 'Please enter valid email').isEmail(),
    check('password').notEmpty().withMessage('Please enter a password.')
],
    async (req, res) => {

        //Check for errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        try {
            //check if user email is already in the database
            let judge1 = await Judge.findOne({ email: req.body.email });

            if (judge1) {
                let hash = judge1.password;
                bcrypt.compare(req.body.password, hash, function (err, result) {
                    if (result) {
                        //generate token
                        const payload = {
                            judge: {
                                id: judge1.id,
                                firstname: judge1.firstname,
                                lastname: judge1.lastname
                            }
                        };

                        jwt.sign(
                            payload,
                            config.get('jwtsecret'),
                            { expiresIn: 360000 },
                            (err, token) => {
                                if (err) throw err;
                                res.json({ token });
                            }
                        );
                    }
                    else {
                        return res.status(400).json({ errors: [{ msg: 'Incorrect password. Please try again or click on forgot password'
                        ,param: "password"}] });
                    }
                });
            } else {
                return res.status(400).json({ errors: [{ msg: 'Judge does not exists.Please contact the admin.',param: "NotFound" }] });
            }

        } catch (err) {
            res.status(500).send(err.message);
        }
    });


//Student authentication
router.post('/student', [
    check('email', 'Please enter valid email').isEmail(),
    check('password').notEmpty().withMessage('Please enter a password.')
],
    async (req, res) => {

        //Check for errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        try {
            //check if user email is already in the database
            let student1 = await Student.findOne({ email: req.body.email });

            if (student1) {
                let hash = student1.password;
                bcrypt.compare(req.body.password, hash, function (err, result) {
                    if (result) {
                        //generate token
                        const payload = {
                            student: {
                                id: student1.id,
                                firstname: student1.firstname,
                                lastname: student1.lastname
                            }
                        };

                        jwt.sign(
                            payload,
                            config.get('jwtsecret'),
                            { expiresIn: 360000 },
                            (err, token) => {
                                if (err) throw err;
                                res.json({ token });
                            }
                        );
                    }
                    else {
                        return res.status(400).json({ errors: [{ msg: 'Incorrect password. Please try again or click on forgot password'
                        ,param: "password"}] });
                    }
                });
            } else {
                return res.status(400).json({ errors: [{ msg: 'Student does not exists. Please create a new account.',param: "NotFound" }] });
            }

        } catch (err) {
            res.status(500).send(err.message);
        }
    });

router.post('/student/forgotpassword', [
    check('email', 'Please enter valid email').isEmail()
], async (req, res) => {
    let student1 = await Student.findOne({ email: req.body.email });
    if (student1 != null) {
        newpassword = generator.generate({
            length: 10,
            numbers: true
        });
        const salt = await bcrypt.genSalt(10);
        student1.password = await bcrypt.hash(newpassword, salt);
        student1.save();
        sendEmail(req.body.email, "Reset Password: Humber Cfe", "Please use this password to login for your account in Humber Cfe &nbsp &nbsp " + newpassword+"<br/> <br/> use this link to login :  https://humbercfeevents.herokuapp.com/");
        res.send("sent");
    }
});

router.post('/admin/forgotpassword', [
    check('email', 'Please enter valid email').isEmail()
], async (req, res) => {
    let admin = await Admin.findOne({ email: req.body.email });
    if (admin != null) {
        newpassword = generator.generate({
            length: 10,
            numbers: true
        });
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(newpassword, salt);
        admin.save();
        sendEmail(req.body.email, "Reset Password: Humber Cfe", "Please use this password to login for your account in Humber Cfe as Admin &nbsp &nbsp " + newpassword+"<br/> <br/> use this link to login :  https://humbercfeevents.herokuapp.com/admin");
        res.send("sent");
    }
});

router.post('/judge/forgotpassword', [
    check('email', 'Please enter valid email').isEmail()
], async (req, res) => {
    let judge1 = await Judge.findOne({ email: req.body.email });
    if (judge1 != null) {
        newpassword = generator.generate({
            length: 10,
            numbers: true
        });
        const salt = await bcrypt.genSalt(10);
        judge1.password = await bcrypt.hash(newpassword, salt);
        judge1.save();
        sendEmail(req.body.email, "Reset Password: Humber Cfe", "Please use this password to login for your account in Humber Cfe as Judge &nbsp &nbsp " + newpassword+"<br/> <br/> use this link to login :  https://humbercfeevents.herokuapp.com/judge");
        res.send("sent");
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
        return "email sent";
      }
    }
module.exports = router;