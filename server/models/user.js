var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        Name: {type: String, required: true},
        Email: {type: String, required: true},
        Theme: {type: String, enum:['Light', 'Dark']},
    },{versionKey: false }
);

module.exports = mongoose.model('User', UserSchema);
