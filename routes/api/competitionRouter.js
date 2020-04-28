const express = require('express');
let Competition = require('../../models/Competition');
const { check, validationResult } = require('express-validator');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const competitionDB = await Competition.find();
        res.send(competitionDB);
    } catch (err) {
        res.status(500).send('server error');
    }
});
router.get('/:id', async (req, res) => {
    try {
        const competitionDB = await Competition.findById(req.params.id);
        res.send(competitionDB);
    } catch (err) {
        res.status(500).send('server error');
    }
});

//Add a competition 
router.post('/', [check('title').notEmpty().withMessage('Please enter a title for the competition.')
    .isLength({ min: 3, max: 20 }).withMessage('Please enter title of minimum 3 and maximum 20 characters.'),
check('description', 'Please enter description for the competition').notEmpty()
    .isLength({ min: 5, max: 30 }).withMessage('Please enter description of minimum 3 and maximum 30 characters.'),
check('start_date', 'Please enter a valid date, greater than current date.').isISO8601().isAfter(),
check('end_date', 'Please enter a valid date').isISO8601(),
check('rules', 'Please upload rules for the competition.').notEmpty(),
check('rubrics', 'Please upload rubrics for the competition.').notEmpty()
// check('question', 'Please enter question for the competition').notEmpty()
//     .isLength({ min: 5}).withMessage('Please enter question of minimum 3 and maximum 30 characters.')
// check('templateType', 'Please enter template type for the question.').notEmpty()
],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     return res.status(422).json({ errors: errors.array() });
            // }
            var fDate = new Date(req.body.start_date);
            var lDate = new Date(req.body.end_date);
            // if(lDate <= fDate){  
            //     return res.status(422).send("Competition end date cannot be less or equal to start date.");
            // }
            const cmp = new Competition({
                title: req.body.title,
                description: req.body.description,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                rules: req.body.rules,
                rubrics: req.body.rubrics
            });
            const nc = await cmp.save();
            res.send(nc);
            // const competitionDB = await Competition.find();

        } catch (err) {
            res.status(500).send(err.message);
        }
    });
    
//update competition 
router.put('/',[check('title').notEmpty().withMessage('Please enter a title for the competition.')
.isLength({ min: 3, max: 20 }).withMessage('Please enter title of minimum 3 and maximum 20 characters.'),
check('description', 'Please enter description for the competition').notEmpty()
.isLength({ min: 5, max: 30 }).withMessage('Please enter description of minimum 3 and maximum 12 characters.'),
check('start_date', 'Please enter a valid date, greater than current date.').isISO8601().isAfter(),
check('end_date', 'Please enter a valid date').isISO8601(),
check('rules', 'Please upload rules for the competition.').notEmpty(),
check('rubrics', 'Please upload rubrics for the competition.').notEmpty(),
// check('templateType', 'Please enter template type for the question.').notEmpty()
] ,async (req, res) => {
    try {
        const cmp = await Competition.findById(req.body.id);
        if (!cmp) {
            return res.status(404).send('Competition not found');
        }
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
        }
                cmp.title = req.body.title,
                cmp.description = req.body.description,
                cmp.start_date = req.body.start_date,
                cmp.end_date = req.body.end_date,
                cmp.rules = req.body.rules,
                cmp.rubrics = req.body.rubrics,
                cmp.surveys = req.body.surveys,
                cmp.question = req.body.question,
                cmp.templateType =req.body.templateType,
                cmp.value =req.body.value,
                cmp.defaultSelected= req.body.defaultSelected

        await cmp.save();
        res.send('Competition updated');
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
});

  
//update competition  by id
router.put('/:id',[check('title').notEmpty().withMessage('Please enter a title for the competition.')
.isLength({ min: 3, max: 20 }).withMessage('Please enter title of minimum 3 and maximum 20 characters.'),
check('description', 'Please enter description for the competition').notEmpty()
.isLength({ min: 5, max: 30 }).withMessage('Please enter description of minimum 3 and maximum 12 characters.'),
check('start_date', 'Please enter a valid date, greater than current date.').isISO8601().isAfter(),
check('end_date', 'Please enter a valid date').isISO8601(),
check('rules', 'Please upload rules for the competition.').notEmpty(),
check('rubrics', 'Please upload rubrics for the competition.').notEmpty(),
// check('templateType', 'Please enter template type for the question.').notEmpty()
] ,async (req, res) => {
    try {
        const cmp = await Competition.findById(req.params.id);
        if (!cmp) {
            return res.status(404).send('Competition not found');
        }
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
        }
                cmp.title = req.body.title,
                cmp.description = req.body.description,
                cmp.start_date = req.body.start_date,
                cmp.end_date = req.body.end_date,
                cmp.rules = req.body.rules,
                cmp.rubrics = req.body.rubrics,
                cmp.surveys = req.body.surveys,
                cmp.question = req.body.question,
                cmp.templateType =req.body.templateType,
                cmp.value =req.body.value,
                cmp.defaultSelected= req.body.defaultSelected

        await cmp.save();
        res.send('Competition updated');
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
});


router.put('/addsurvey/:id',[check('surveys', 'Please enter question for the competition').notEmpty()
.isLength({ min: 5, max: 30 }).withMessage('Please enter question of minimum 3 and maximum 12 characters.')],async (req, res) =>{
    const cmp = await Competition.findById(req.params.id);
    console.log(req.body.surveys)
    if (!cmp) {
        return res.status(404).send('Competition not found');
    }
    // const errors = validationResult(req);
    //         if (!errors.isEmpty()) {
    //             return res.status(422).json({ errors: errors.array() });
    //     }
    cmp.surveys = req.body.surveys;
    await cmp.save();
    res.send("Surveys added");
});

router.delete('/:id', async (req, res) => {
    try {
      await Competition.findByIdAndRemove({ _id: req.params.id });
      res.json({ msg: 'Competition deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  });

module.exports = router;