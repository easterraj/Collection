"use strict";

var mongoose = require('mongoose');
var User = require('../models/login/user-login');
var data = require('./res');
var jwt = require('jsonwebtoken');
var config = require('../config/database');
var passport = require('passport');
require('../config/passport')(passport);

var loginApi = {
    createUser : (user,cb)=>{
       if (!user.emailID || !user.password) {
           data.success = false;
           data.msg = "Please pass username and password."
           cb(null,data);
       } else {
            var newUser = new User({
                email_id: user.emailID,
                password: user.password,
                name: { first_name: user.firstName,
                        last_name: user.lastName},
                location: user.location,
                mobile_num: user.mobileNum
            });

           newUser.save((err)=>{
               if(err){
                data.success = false;
                data.msg = err.message;
                return cb(err,data);
               }        
               data.success = true;
               data.msg = "Successful created new user.";
               cb(null,data);
           });
       }
    },
    findUser : (fuser,cb)=>{
        User.findOne({email_id: fuser.emailid},(err, user)=>{
            if (err) throw err;
            if (!user){
                data.success = false;
                data.msg = 'Authentication failed. User not found.'+fuser.emailid;
                cb(401,data);
            } else{
                
                user.comparePassword(fuser.password,(err, isMatch)=>{
                    
                    if (isMatch && !err){
                        var token = jwt.sign(user.toJSON(), config.secret);
                        data.success = true;
                        data.msg = 'JWT ' + token
                        cb(null,data);
                    } else {
                        data.success = false;
                        data.msg ='Authentication failed. Wrong password.';
                        cb(401,data);
                    }

                });
            }
        })
    }
};

module.exports = loginApi;