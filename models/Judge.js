const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentsAssignedSchema = new mongoose.Schema({
        student:{
            type: Schema.Types.ObjectId,
            ref: 'students'
        },
        totalScore:Number  
});
const competitionAssignedSchema = new mongoose.Schema({
    competition:{
        type: Schema.Types.ObjectId,
        ref: 'competitions'
    },
    studentsAssigned:
    [
        studentsAssignedSchema
    ]
});
const JudgeSchema = new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
    firstname:{
        type:String
    },
    lastname:{
        type:String
     },
    designation:{
        type:String
     },
    competitionAssigned:
    [
        competitionAssignedSchema
    ]
});

const Judge = mongoose.model('judge',JudgeSchema);

module.exports = Judge;