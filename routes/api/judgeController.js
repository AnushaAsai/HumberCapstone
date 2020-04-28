const express = require('express');
let Judge = require('../../models/Judge');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const generator = require('generate-password');
const nodemailer = require("nodemailer");


router.post('/', [
    check('email').isEmail().withMessage('Please enter a valid email address'),
    check('firstname', 'Please enter firstname').notEmpty()
        .isLength({ min: 2, max: 12 }).withMessage('Please enter firstname of minimum 3 and maximum 12 characters.'),
    check('lastname', 'Please enter lastname').notEmpty()
        .isLength({ min: 2, max: 12 }).withMessage('Please enter lastname of minimum 3 and maximum 12 characters.'),
    check('designation', 'Please enter designation').notEmpty()
        .isLength({ min: 2, max: 20 }).withMessage('Please enter designation of minimum 20 and maximum  characters.')
        .isString().withMessage('Please enter character only.')
], async (req, res) => {
    try {

        //Check if no errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        //check if judge email is already in the database
        let jd = await Judge.findOne({ email: req.body.email });
        if (jd) {
            return res.status(400).json({ error: [{ msg: 'Judge already exists' }] });
        }

        //create new judge
        console.log(req.body);
        const judge = new Judge({
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            designation: req.body.designation
        });
        var password = generator.generate({
            length: 10,
            strict:true,
            numbers:true,
            symbols:true,
            uppercase:true,
            excludeSimilarCharacters:true,
            exclude:"{,}"
        }); 
        sendEmail(req.body.email,"Humber Cfe Login Credential For Judge","<p> Hello "+req.body.firstname+" "+req.body.lastname+",<br/><br/> Your password to login in Humber Cfe Judge is :"+password+"<br/><br/><br/> You can use this link to login : https://humbercfeevents.herokuapp.com/judge </p>");
        //hash the password
        const salt = await bcrypt.genSalt(10);
        judge.password = await bcrypt.hash(password, salt);

        //save the judge
        const nj = await judge.save();
        res.send(nj);

    } catch (err) {
        res.status(500).send(err.message);
        console.log(err);
    }
});

//Find all
router.get('/', async (req, res) => {
    try {
        const judge = await Judge.find({});
        res.send(judge);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/getJudges/:comp_id', async (req, res) => {
    try {
        const judge = await Judge.find({ competition_id: req.params.comp_id });
        res.send(judge);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const judge = await Judge.findById({ _id: req.params.id });
        res.send(judge);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

//Delete judge by judge id
router.delete('/:id', async (req, res) => {
    try {
        await Judge.findByIdAndRemove({ _id: req.params.id });
        res.json({ msg: 'Judge deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

//update judge 
router.put('/', [
    check('email').isEmail().withMessage('Please enter a valid email address'),
    check('password', 'Please enter password of minimum 6 and maximum 10 length.').isLength({ min: 6, max: 10 })
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
        .withMessage('Please enter password that contains at least one uppercase, lowercase, digit and special character(!@#$%^&*).'),
    check('firstname', 'Please enter firstname').notEmpty()
        .isLength({ min: 2, max: 12 }).withMessage('Please enter firstname of minimum 2 and maximum 12 characters.'),
    check('lastname', 'Please enter lastname').notEmpty()
        .isLength({ min: 2, max: 12 }).withMessage('Please enter lastname of minimum 2 and maximum 12 characters.'),
    check('designation', 'Please enter designation').notEmpty()
        .isLength({ min: 2, max: 20 }).withMessage('Please enter designation of minimum 2 and maximum 20 characters.')
        .isString().withMessage('Please enter character only.')
], async (req, res) => {
    try {
        const judge = await Judge.findById(req.body.id);
        if (!judge) {
            return res.status(404).send('Judge not found');
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        judge.email = req.body.email;
        judge.password = req.body.password;
        judge.firstname = req.body.firstname;
        judge.lastname = req.body.lastname;
        judge.designation = req.body.designation;
        judge.competitionAssigned = req.body.competitionAssigned;
        judge.studentsAssigned = req.body.studentsAssigned;
        judge.competition = req.body.competition;
        judge.student = req.body.student;

        await judge.save();
        res.send('judge updated');
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
});

//assign judge 
router.put('/assign', async (req, res) => {
    try {
        const judge = await Judge.findById(req.body.id);
        if (!judge) {
            return res.status(404).send('Judge not found');
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        var flag;
        if (judge.competitionAssigned.length > 0) {
            judge.competitionAssigned.forEach(element => {
                if (element.competition == req.body.competitionAssigned[0].competition) {
                    var student = req.body.competitionAssigned[0].studentsAssigned[0].student;
                    element.studentsAssigned.push({ 'student': student });
                    flag= false;
                } else {
                    flag = true;
                }
            });
            if (flag) {
                var compId = req.body.competitionAssigned[0].competition;
                var student= req.body.competitionAssigned[0].studentsAssigned[0].student;
                var studentAssigned = ({'student':student});
                judge.competitionAssigned.push({'competition':compId,'studentsAssigned':studentAssigned});
            }

        } else {
            judge.competitionAssigned = req.body.competitionAssigned;
            judge.studentsAssigned = req.body.studentsAssigned;
            judge.competition = req.body.competition;
            judge.student = req.body.student;
        }

        const up = await judge.save();
        res.send(up);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
});

//update score by judge
router.put('/updateScore', async (req, res) => {
    try {
        const judge = await Judge.findById(req.body.id);
        if (!judge) {
            return res.status(404).send('Judge not found');
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        
        if(judge.competitionAssigned.length>0){
            judge.competitionAssigned.forEach(j=>{
                if(j.competition==req.body.competition){
                    //var score = req.body.competitionAssigned[0].studentsAssigned[0].totalScore;
                    j.studentsAssigned.forEach(s=>{
                        if(s.student==req.body.student){
                            s.totalScore = req.body.totalScore;
                        }
                    })
                }
            })
        }
        else{
            return res.status(404).send('Competition not found');
        }

        const up = await judge.save();
        res.send(up);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
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