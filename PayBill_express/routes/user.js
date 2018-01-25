

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
var jwt = require('jsonwebtoken');
var userApi = require('../data/user-api');

var data = require('../data/res');




/* GET users listing. */
router.get('/subscribed/:id', function(req, res, next) {
  userApi.subscribed(req.params.id,(err,sub)=>{
    if(err){
      console.log("Subscribe_error",err);
      res.send(err);
    }
    else{
      console.log("Subscribe",sub);
      if(sub !=null)
      {
        console.log("sub not null")
        data.success = false;
        data.msg = "Found";
        res.json(data);
      }
      else
      {
        console.log("sub null")
        data.success = false;
        data.msg = "notFound";
        res.json(data);
      }
   
    }
});
})

router.post('/subscribe',passport.authenticate('jwt', { session: false}), function(req,res){
  userApi.queryBiller(req.body.id,(err,biller)=>{
   var data ={};
   if(err){
       res.send(err);
     }
     else{
       data.name = req.jwtData.name.first_name;
       data.userId = req.jwtData.email_id;
       data.billerId = biller.billerId;
       data.categoryId = biller.categoryId;
     console.log("data:",data.billerId);
       userApi.subscribe(data,(err,users)=>{
         if(err){
             res.send(err);
           }
           else{
             res.json(users);
           }
      
     });
     }
   });
 })

router.get('/sub/:id', function(req,res){
  userApi.getSubscribe(req.params.id,(err,users)=>{
      if(err){
          res.send(err);
        }
        else{
          console.log(users);
          res.json(users);
        }
  });
})

  router.get('/biller',passport.authenticate('jwt', { session: false}), function(req,res){
    userApi.getBiller((err,biller)=>{
        if(err){
            res.send(err);
          }
          else{
            res.json(biller);
          }
    });
  })


  router.get('/bill',passport.authenticate('jwt', { session: false}), function(req,res){
    userApi.getBill( req.jwtData.email_id,(err,bills)=>{
        if(err){
            res.send(err);
          }
          else{
            res.json(bills);
          }
    });
  })
    
    router.post('/paybill', function(req,res){
      userApi.payBill(req.body,(err,users)=>{
          if(err){
              res.send(err);
            }
            else{
              res.json(users);
            }
      });
    })
     router.get('/payhistory', function(req,res){
        userApi.payHistory((err,users)=>{
            if(err){
                res.send(err);
              }
              else{
                res.json(users);
              }
        });
      })
    

module.exports = router;
