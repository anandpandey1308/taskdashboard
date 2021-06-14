const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const salts = 10;

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    username: {
        type: String,
        required:true,
        index: { unique: true } 
    },
    password: { 
        type: String, 
        required: true 
    }
});

UserSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(salts, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });

});

UserSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports =  mongoose.model('User', UserSchema);