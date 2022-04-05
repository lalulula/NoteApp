var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        theme: {type: String, enum:['Light', 'Dark'], default:'Light'},

    }
);

// UserSchema.virtual('name').get(function () {
//         return this.name;
//     });

// UserSchema.virtual('email').get(function () {
//         return this.email;
//     });


// UserSchema.virtual('theme').get(function () {
//         return this.theme;
//     });

module.exports = mongoose.model('User', UserSchema);
