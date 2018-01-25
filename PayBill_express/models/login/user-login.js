

"use strict";

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email_id: {
        type: String,
        unique: true,
        required: true,
        trim : true
    },
    password: {
        type: String,
        required: true
    },
    name :{
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: false
        }
    },
    location: {
        type: String,
        required: false
    },
    mobile_num: {
        type: Number,
        required: true
    }
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                console.log("password:",user.password);
                user.password = hash;
                console.log("password:",user.password);
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        console.log("password2:"+passw+"passwor3:"+isMatch);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);