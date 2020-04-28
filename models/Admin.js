const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdminSchema = new mongoose.Schema({
    email:String,
    password:String,
    firstname:String,
    lastname:String,
});

const Admin = mongoose.model('admin',AdminSchema);
module.exports = Admin;
