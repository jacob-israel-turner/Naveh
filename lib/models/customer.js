var Mongoose = require('mongoose'),
	address = require('./shared/address'),
	phone = require('./shared/phone'),
	billing = require('./shared/billingInfo'),
	Schema = Mongoose.Schema;

var schema = new Schema({
	email: {type: String, uniqueness: true, required: true },
	name: { type: String, required: true },
	phone: phone,
	address: address,
	bio: { type: String },
	active: {type: Boolean, default: true}
});

module.exports = Mongoose.model('Customer', schema);