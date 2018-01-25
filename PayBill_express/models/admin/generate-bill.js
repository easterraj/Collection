var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-sequence')(mongoose);

var billSchema = new Schema({
    billId: Number,
    billerId: Number,
    billerName: String,
    userId: String,
    userName: String,
    billAmount: Number,
    billGeneratedDate: Date,
    billDueDate: Date,
    billStatus: String
});
billSchema.plugin(autoIncrement, {inc_field: 'billId'});

module.exports =  mongoose.model('bill',billSchema);