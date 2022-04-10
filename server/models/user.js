var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        theme: {type: String, enum:['Light', 'Dark'], default:'Light'},
    },{versionKey: false }
);

module.exports = mongoose.model('User', UserSchema);
