var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
//require('../config/passport')(passport);
var jwt = require('jsonwebtoken');
var User = require("../models/login/user-login");
var loginApi = require("../data/login-api");
var router = express.Router();

router.get('/',(req,res,next)=>{
    res.send("<h2>Login Page</h2>");
});

router.post('/signin',(req,res,next)=>{
    loginApi.findUser(req.body,(err,data)=>{
        console.log("res:",data);
        res.json(data);
    });
});

router.post('/signup',(req,res,next)=>{
    loginApi.createUser(req.body,(err,data)=>{
        if(err == 401)
        res.status(401).json(data);
        console.log("res:",data);
        res.json(data);
    })

});

router.get('/test',passport.authenticate('jwt', { session: false}),(req,res,next)=>{
    res.send("success");
})

module.exports=router;