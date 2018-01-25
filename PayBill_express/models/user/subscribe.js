"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subscribeSchema = new Schema(
    {
        user : 
        {
           name :{
                type : String
            },
            id:{
                type: String
            }

        },
        billerId :
        {
            type:Number
            
        },
        categoryId :
        {
            type:Number
        }
    }
);

module.exports = mongoose.model('subscribe',subscribeSchema);