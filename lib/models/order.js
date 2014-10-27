var Mongoose = require('mongoose'),
	customer = require('./customer'),
	product = require('./product'),
	objectId = Mongoose.Schema.Types.ObjectId
	Schema = Mongoose.Schema;

var schema = new Schema({
	customer: {type: objectId, ref: "Customer", required: true },
	products: [{
		product: { type: objectId, ref: "Product", required: true },
		amount: { type: Number, required: true, min: 1, max: 99 }
	}]
});

module.exports = Mongoose.model('Order', schema);