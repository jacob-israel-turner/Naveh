var Mongoose = require('mongoose'),
	customer = require('./customer'),
	product = require('./product'),
	objectId = Mongoose.Schema.Types.ObjectId,
	address = require('./shared/address')
	Schema = Mongoose.Schema;

var schema = new Schema({
	customer: {type: objectId, ref: "Customer", required: true },
	products: [{
		product: { type: objectId, ref: "Product", required: true },
		price: { type: Number, min: 1, max: 100000, required: true },
		quantity: { type: Number, required: true, min: 1, max: 99 }
	}],
	shippingAddy: address,
	status: { type: String, enum: ['processing', 'shipping', 'on hold', 'delivered'], default: 'processing'}
});

module.exports = Mongoose.model('Order', schema);