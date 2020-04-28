const express = require('express');
let Student = require('../../models/Student');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


router.get('/', async (req, res) => {
    try {
        const studentDB = await Student.find();
        res.send(studentDB);
    } catch (err) {
        res.status(500).send('server error');
    }
});

router.post('/', [
    check('email').isEmail().withMessage('Please enter a valid email address'),
    check('password', 'Please enter password of minimum 6 and maximum 10 length.').isLength({ min: 6, max: 10 })
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
        .withMessage('Please enter password that contains at least one uppercase, lowercase, digit and special character(!@#$%^&*).'),
    check('firstname', 'Please enter firstname').notEmpty()
        .isLength({ min: 2, max: 12 }).withMessage('Please enter firstname of minimum 2 and maximum 12 characters.'),
    check('lastname', 'Please enter lastname').notEmpty()
        .isLength({ min: 2, max: 12 }).withMessage('Please enter lastname of minimum 2 and maximum 12 characters.'),
    check('phone', 'Please enter phone number').notEmpty()
        .matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
        .withMessage('Please a valid phone number in the proper format 555-555-5555.'),
],
    async (req, res) => {
        try {

            //Check if no errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            //check if student email is already in the database
            let stud = await Student.findOne({ email: req.body.email });
            if (stud) {
                return res.status(400).json({ error: [{ msg: 'Student already exists', params: 'alreadyExists' }] });
            }


            //create new student
            const student = new Student({
                email: req.body.email,
                password: req.body.password,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                phone: req.body.phone,
                competition: req.body.competition,
                response: req.body.response,
                answer: req.body.answer,
                surveryAnswer: req.body.surveryAnswer,
                totalScore: req.body.totalScore,
                is_submitted: req.body.is_submitted
            });

            //hash the password
            const salt = await bcrypt.genSalt(10);
            student.password = await bcrypt.hash(req.body.password, salt);

            //save the user
            const ns = await student.save();
            res.send(ns);

        } catch (err) {
            res.status(500).send(err.message);
        }
    });

//Find all
router.get('/', async (req, res) => {
    try {
        const student = await Student.find({});
        res.send(student);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

//Find student by id
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).send('student not found');
        }
        res.send(student);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.put('/addresponse', async (req, res) => {
    try {
        const student = await Student.findById(req.body.id);
        if (!student) {
            return res.status(404).send('student not found');
        }
        if (student.response.length > 0) {
            var compId = req.body.response[0].competition;
            var filelocation = req.body.response[0].file;
            var is_submitted = req.body.response[0].is_submitted;
            var answer = req.body.response[0].answer;
            student.response.push({ 'competition': compId, 'file': filelocation, 'answer': answer, 'is_submitted': is_submitted })
        } else {
            student.file = req.body.file
            student.response = req.body.response
            student.is_submitted = req.body.is_submitted
        }
        await student.save();
        res.send("response Added")
    } catch (err) {
        res.status(500).send(err.message);
    }
});


//Delete student by student id
router.delete('/:id', async (req, res) => {
    try {
        await Student.findByIdAndRemove({ _id: req.params.id });
        res.json({ msg: 'Student deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

//Update student
router.put('/', [
    check('email').isEmail().withMessage('Please enter a valid email address'),
    check('password', 'Please enter password of minimum 6 and maximum 10 length.').isLength({ min: 6, max: 10 })
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
        .withMessage('Please enter password that contains at least one uppercase, lowercase, digit and special character(!@#$%^&*).'),
    check('firstname', 'Please enter firstname').notEmpty()
        .isLength({ min: 2, max: 12 }).withMessage('Please enter firstname of minimum 2 and maximum 12 characters.'),
    check('lastname', 'Please enter lastname').notEmpty()
        .isLength({ min: 2, max: 12 }).withMessage('Please enter lastname of minimum 2 and maximum 12 characters.'),
    check('phone', 'Please enter phone number').notEmpty()
        .matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
        .withMessage('Please a valid phone number in the proper format 555-555-5555.'),
    check('batch', 'Please enter batch').notEmpty(),
    check('surveryAnswer', 'Please enter surveryAnswer').notEmpty(),
], async (req, res) => {
    try {
        const student = await Student.findById(req.body.id);
        if (!student) {
            return res.status(404).send('student not found');
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        student.email = req.body.email;
        student.password = req.body.password;
        student.firstname = req.body.firstname;
        student.lastname = req.body.lastname;
        student.phone = req.body.phone;
        student.batch = req.body.batch;
        student.response = req.body.response;
        student.competition = req.body.competition;
        student.surveryAnswer = req.body.surveryAnswer;
        student.totalScore = req.body.totalScore;
        student.is_submitted = req.body.is_submitted;

        await student.save();
        res.send('student updated');
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
});

module.exports = router;