const mongoose = require('mongoose');


const questionSchema = new mongoose.Schema({
    question:String,
    templateType:String,
    templateSpecification: [
       {type:String}
    ]
});
const CompetitionSchema = new mongoose.Schema({
    title:String,
    description:String,
    start_date:String,
    end_date:String,
    rules:String,
    rubrics:String,
    surveys:[
        questionSchema
    ] 
});

const Competition = mongoose.model('competition',CompetitionSchema);
module.exports = Competition;
