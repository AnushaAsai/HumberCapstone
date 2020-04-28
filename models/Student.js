const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new mongoose.Schema({
    surveryAnswer:String
});
const responseSchema = new mongoose.Schema({
        competition:{
            type: Schema.Types.ObjectId,
            ref: 'competitions'
        },
        file: {type:String},
        answer:
        [
            answerSchema
        ],
        is_submitted:Boolean,
        totalScore:Number
    
});

const StudentSchema = new mongoose.Schema({
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
    phone:{
        type:String
     },
    response:
    [
        responseSchema
    ]
});

const Student = mongoose.model('student',StudentSchema);

module.exports = Student;