var Mongoose = require('mongoose'),
	Schema = Mongoose.Schema,
	product = require('./shared/product');

var schema = new Schema(product);

module.exports = Mongoose.model('Product', schema);