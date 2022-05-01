var mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var validateEmail = function(email){
    var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
}

var UserSchema = new Schema(
    {
        Name: {type: String, required: true, unique:true},
        Email: {type: String, required: true, trim:true, unique:true,validate:[validateEmail, 'Please fill a valid Email']},
        Theme: {type: String, enum:['Light', 'Dark'], default:'Light'},
        profile_url: {type: String, default:""},
        password:{type:String, required:true, minlength: 6}

    },{versionKey: false }
);
UserSchema.statics.findAndValidate = async function (Email, password) {
    const user = await this.findOne({Email});
    if(!user) {
        return false;
    }
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : false;
}

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})


module.exports = mongoose.model('User', UserSchema);
