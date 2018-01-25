var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-sequence')(mongoose);

var categorySchema = new Schema({
    categoryId: {type: Number, unique: true},
    categoryName: {type: String}
});

categorySchema.plugin(autoIncrement, {inc_field: 'categoryId'});

module.exports = mongoose.model('Category', categorySchema);