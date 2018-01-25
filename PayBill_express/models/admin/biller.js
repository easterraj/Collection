var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-sequence')(mongoose);

var billerSchema = new Schema({
    billerId: {type:Number,unique:true},
    billerName: String,
    categoryId: Number,
    billerDescription: String,
    dueDateAgeing: Number,
    fineAmount: Number
});

billerSchema.plugin(autoIncrement, {inc_field: 'billerId'});

module.exports =  mongoose.model('biller',billerSchema);
