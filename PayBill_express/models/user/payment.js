"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Payment = new Schema({
    user : 
    {
       name :{
            type : String
        },
        id:{
            type:Number
        }

    },
    billId: {
        type: Number,
        unique: true
    },
    amount: Number,
    payment_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('payment',Payment);