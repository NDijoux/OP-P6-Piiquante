const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String, 
        required: true, 
        unique: true
     },
    password: {
        type: String, 
        required: true,
     },
});

UserSchema.plugin(uniqueValidator);

module.exports = User = mongoose.model('User', UserSchema);