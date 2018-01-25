"use strict"

var mongoose = require("mongoose");
var Category = require("../models/admin/category");
var Biller = require("../models/admin/biller");
var Bill = require("../models/admin/generate-bill");
var config = require('../config/database');
var User = require('../models/login/user-login');


var adminApi ={
    getCategory: (cb)=>{
        console.log("Category");
        Category.find(function(err,category){
          if (err){
            console.log("err:",err);
             cb(err,null);
            }
          else {
               cb(null,category);
          }
        });
    },
    
    newCategory: (data,cb)=>{
      var cate = new Category();
      cate.save(function(err,category){
      cb(null,data);
      });
    },

    getBillers: (cb)=>{
        Biller.find({},function(err,biller){
            if(err){
               cb(err,null)
            }
            else{
               cb(null,biller);
            }
          });
    },
    getBiller: (id,cb)=>{
      Biller.findOne({billerId: id},function(err,biller){
          if(err){
             cb(err,null)
          }
          else{
             cb(null,biller);
          }
        });
  },
    newBiller: (data,cb)=>{
      var biller = new Biller();
      biller.billerId = data.billerID;
      biller.categoryId =data.categoryId;
      biller.billerName = data.billerName;
      biller.billerDescription = data.billerDescription;
      biller.dueDateAgeing = data.dueDateAgeing;
      biller.fineAmount = data.fineAmount;
        biller.save(function(err,biller){
          if(err){
             cb(err,null)
          }
          else{
             cb(null,biller);
          }
            });
    },

    updateBiller: (id,data,cb)=>{
        Biller.findOneAndUpdate(
            {billerId: id},
            {$set: {billerName: data.billerName, billerDescription: data.billerDescription, dueDateAgeing: data.dueDateAgeing, fineAmount: data.fineAmount}},
            function (err, biller) {
              if(err){
                 cb(err,null)
              }
              else{
                 cb(null,biller);
              }
          });
    },

    removeBiller: (id,cb)=>{
        Biller.findOneAndRemove(
            {billerId: id},
            function (err, biller) {
              if(err){
                 cb(err,null)
              }
              else{
                 cb(null,biller);
              }
            });
    },

    addBill: (data,cb)=>{
      var bill = new Bill();
      var currentDate = new Date();
      bill.billerId = data.billerId;
      Biller.findOne({billerId:data.billerId},(err,biller)=>{
        if(err){
          throw err;
       }
       else{
        bill.billerName = biller.billerName;
       }
      })
      
      bill.userName = data.userName;
      bill.billAmount = parseInt(data.billAmount);
      bill.billGeneratedDate = currentDate;
      bill.billDueDate = data.billDueDate;
      bill.billStatus = 'N'

        bill.save(function(err,bill){
          if(err){
             cb(err,null)
          }
          else{
             cb(null,bill);
          }
            });
    },

    findBill: (id,cb)=>{
        Bill.find({billerId: id},function(err,bill){
          if(err){
             cb(err,null)
          }
          else{
             cb(null,bill);
          }
          });
    },

    updateBill: (id,data,cb)=>{
        Bill.findOneAndUpdate(
            {billId: id},
            {$set: {billAmount: data.billAmount,billDueDate: data.dueDate}},
            function (err, bill) {
              if(err){
                 cb(err,null)
              }
              else{
                 cb(null,bill);
              }
          });
    },

    removeBill: (id,cb)=>{
        Bill.findOneAndRemove(
            {billId: id},
            function (err, bill) {
              if(err){
                 cb(err,null)
              }
              else{
                 cb(null,bill);
              }
            });
    },

    generateChat: (cb)=>{
        Bill.aggregate([
            { $group: {
              "_id": "$billerName" ,
              "total": { $sum: "$billAmount" }},
            }
          ]).sort({total: -1}).limit(10).exec(function(err, bill) {
            if(err){
               cb(err,null)
            }
            else{
               cb(null,bill);
            }
          }
        );
    },

    coutBill: (id)=>{
        Bill.count({billerId: id},function(err,billcount){
          if(err){
             cb(err,null)
          }
          else{
             cb(null,bill);
          }
          });
    }
}

module.exports = adminApi;
