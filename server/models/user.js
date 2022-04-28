var mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var validateEmail = function(email){
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}

var UserSchema = new Schema(
    {
        Name: {type: String, required: true},
        Email: {type: String, required: true, trim:true, unique:true},
        Theme: {type: String, enum:['Light', 'Dark'], default:'Light', validate:[validateEmail, 'Please fill a valid Email'],
                match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid Email']},
        profile_url: {type: String, default:""},
        password:{type:String, required:true,minlength: 6}

    },{versionKey: false }
);
UserSchema.statics.findAndValidate = async function (email, password) {
    const user = await this.findOne({email});
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
