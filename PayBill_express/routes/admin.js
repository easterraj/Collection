var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jsonwebtoken');

var config = require('../config/database');
var adminApi = require('../data/admin-api');

router.get('/',(req,res,next)=>{
    res.send("<h2>Admin Page</h2>");
});

router.get('/category', function(req,res){
    adminApi.getCategory((err,category)=>{
        if(err){
            res.send(err);
          }
          else{
            res.json(category);
          }
    });
  
  });
  
  router.post('/create', function(req,res){
    adminApi.newCategory(data,(err,category)=>{
        if(err){
            res.send(err);
          }
          else{
            res.json(category);
          }
    })
  });
  
  router.get('/biller', function(req,res){
    adminApi.getBillers((err,biller)=>{
        if(err){
            res.send(err);
          }
          else{
            console.log(biller);
            res.json(biller);
          }
    });
  });

  router.get('/biller/:id', function(req,res){
    adminApi.getBiller(req.params.id,(err,biller)=>{
        if(err){
            res.send(err);
          }
          else{
           
            res.json(biller);
          }
    });
  });
  
  router.post('/addbiller',function(req, res){
    adminApi.newBiller(req.body,(err,biller)=>{
        if(err){
            console.log(err);
            res.send(err);
          }
          else{
            console.log(biller);
            res.json(biller);
          }
    
    });
   
  
  });
  
  router.post('/editbill/:billerId', function(req, res) {
   adminApi.updateBill(parseInt(req.params.billerId),req.body,(err,cb)=>{
    if (err){
        console.log(err);
        res.send(err);
        }
      else {
          console.log(biller);
          res.json(biller);
      }
   });
      
    
  });
  
  router.delete('/delete/:billerId', function(req, res) {
    adminApi.removeBill(parseInt(req.params.billerId),(err,biller)=>{
        if (err){
            console.log(err);
            res.send(err);
            }
          else {
              console.log(biller);
              res.json(biller);
          }
    });
     
      
     });


  router.post('/addbill',function(req, res){
    
    adminApi.addBill(req.body,(err,bill)=>{
        if(err){
            console.log(err);
            res.send(err);
          }
          else{
            console.log(bill);
            res.json(bill);
          }
    
    });   
    });
  
    router.get('/viewbills/:billerId', function(req,res){
     adminApi.findBill(parseInt(req.params.billerId),(err,bill)=>{
        if(err){
            console.log(err);
            res.send(err);
          }
          else{
            console.log(bill);
            res.json(bill);
          }
    
     })
    });
    
    router.post('/editbiller/:billId', function(req, res) {
    adminApi.updateBiller(parseInt(req.params.billId),req.body,(err,bill)=>{
        if(err){
            console.log(err);
            res.send(err);
          }
          else{
            console.log(bill);
            adminApi.getBillers((err,billers)=>{
              if(err){
                console.log(err);
                res.send(err);
              }
              else{
                res.json(billers);
              }
            })
          
          }
    
    });
      
       
    });

    router.delete('/deletebiller/:billId', function(req, res) {
        adminApi.removeBiller(parseInt(req.params.billId),(err,cb)=>{
            if(err){
                console.log(err);
                res.send(err);
              }
              else{
                console.log(bill);
                res.json(bill);
              }
        });
       
         });  
  
    router.get('/chartbill', function(req,res){
     adminApi.generateChat((err,bill)=>{
        if(err){
            console.log(err);
            res.send(err);
          }
          else{
            console.log(bill);
            res.json(bill);
          }
     });
    });
  
   
  
      router.get('/countbill/:billerId', function(req,res){
       adminApi.coutBill(parseInt(req.params.billerId),(err,billcount)=>{
        if(err){
            console.log(err);
            res.send(err);
          }
          else{
            
            res.json(billcount);
          }
       })
      });


module.exports=router;