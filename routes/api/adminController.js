const express = require('express');
let Admin = require('../../models/Admin');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/authAdmin');
const generator = require('generate-password');
const nodemailer = require("nodemailer");


//Insert new admin
router.post('/', [
  check('email').isEmail().withMessage('Please enter a valid email address'),
 check('firstname', 'Please enter firstname').notEmpty()
    .isLength({ min: 2, max: 12 }).withMessage('Please enter firstname of minimum 2 and maximum 12 characters.'),
  check('lastname', 'Please enter lastname').notEmpty()
    .isLength({ min: 2, max: 12 }).withMessage('Please enter lastname of minimum 2 and maximum 12 characters.')
], async (req, res) => {
  try {

    //Check if no errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    //check if admin email is already in the database
    let ad = await Admin.findOne({ email: req.body.email });
    if (ad) {
      return res.status(400).json({ error: [{ msg: 'Admin already exists' }] });
    }

    //create new admin\
    const admin = new Admin({
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname
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
  sendEmail(req.body.email,"Humber Cfe Login Credential For Admin","<p> Hello "+req.body.firstname+" "+req.body.lastname+",<br/><br/> Your password to login in Humber Cfe Admin is :"+password+"<br/><br/><br/> You can use this link to login : https://humbercfeevents.herokuapp.com/admin </p>");
    //hash the password
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);

    //save the admin
    const na = await admin.save();
    res.send(na);


  } catch (err) {
    res.status(500).send('server error');
  }
});

//Find all
router.get('/', async (req, res) => {
  try {
    const admin = await Admin.find({});
    res.send(admin);
  } catch (err) {
    res.status(500).send('server error');
  }
});


//Delete admib by admin id
router.delete('/:id', async (req, res) => {
  try {
    await Admin.findByIdAndRemove({ _id: req.params.id });
    res.json({ msg: 'Admin deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

//Update admin
router.put('/', [check('email').isEmail().withMessage('Please enter a valid email address'),
check('password', 'Please enter password of minimum 6 and maximum 10 length.').isLength({ min: 6, max: 10 })
  .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
  .withMessage('Please enter password that contains at least one uppercase, lowercase, digit and special character(!@#$%^&*).'),
check('firstname', 'Please enter firstname').notEmpty()
  .isLength({ min: 2, max: 12 }).withMessage('Please enter firstname of minimum 2 and maximum 12 characters.'),
check('lastname', 'Please enter lastname').notEmpty()
  .isLength({ min: 2, max: 12 }).withMessage('Please enter lastname of minimum 2 and maximum 12 characters.')]
  , async (req, res) => {
    try {
      const admin = await Admin.findById(req.body.id);
      if (!admin) {
        return res.status(404).send('admin not found');
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      admin.email = req.body.email;
      admin.password = req.body.password;
      admin.firstname = req.body.firstname;
      admin.lastname = req.body.lastname;

      await admin.save();
      res.send('admin updated');
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  });

//Get admib by admin id
router.get('/:id', async (req, res) => {
  try {
    const admin = await Admin.findById({ _id: req.params.id });
    res.json(admin);
  } catch (err) {
    console.error(err.message);
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