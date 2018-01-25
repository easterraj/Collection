"use strict";

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');


var config = require('../config/database');
var bill = require('../models/admin/generate-bill');
var Biller = require("../models/admin/biller");
var subscribe = require('../models/user/subscribe');
var payment = require('../models/user/payment');

//var token;
//var passport = require('../config/passport')(passport);
//var decoded = jwt.verify(token, config.secret);


var userApi = {
    
    subscribed: (billerId,cb)=>{
        subscribe.findOne({billerId},(err,user)=>{
            if (err){
                console.log(err);
                return cb(err,null);
                }
              else {
                     return cb(null,user);
              }
        });
    },

    getSubscribe: (billerId,cb)=>{
        subscribe.find({billerId},(err,user)=>{
            if (err){
                console.log(err);
                return cb(err,null);
                }
              else {
                return cb(null,user);
              }
        })
    },
     getBill: (id,cb)=>{
        bill.find({userName:id},function(err,bills){
            if (err){
                console.log(err);
                return cb(err,null);
                }
              else {
                  return cb(null,bills);
              }
        });
    },

    getBiller: (cb)=>{
        Biller.find({},function(err,biller){
            if (err){
                console.log(err);
                return cb(err,null);
                }
              else {
                  return cb(null,biller);
              }
          });
    },

    queryBiller: (id,cb)=>{
        Biller.findOne({billerId:id},function(err,biller){
            if (err){
                console.log(err);
                return cb(err,null);
                }
              else {
                  return cb(null,biller);
              }
          });
    },


    payBill: (data)=>{
        var pay = new payment(data);
        pay.save((err,paybill)=>{
            if (err){
                console.log(err);
                return cb(err,null);
                }
              else {
                  return cb(null,paybill);
              }
        });
    },

    payHistory: ()=>{
        payment.find({id},(err,d)=>{

        });
    },

    subscribe: (data,cb)=>{
        var sub = new subscribe({
            user: {name:data.name,
                id:data.userId},
            billerId : data.billerId,
            categoryId: data.categoryId
        });
        sub.save((err,sub)=>{
            if (err){
                console.log("err:",err);
                 cb(err,null);
                }
              else {
                   cb(null,sub);
              }
        });
    }

 

};

module.exports = userApi;
