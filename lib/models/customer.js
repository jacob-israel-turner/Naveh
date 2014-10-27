var Mongoose = require('mongoose'),
	validate = require('mongoose-validator'),
	address = require('./shared/address'),
	phone = require('./shared/phone'),
	billing = require('./shared/billingInfo'),
	Schema = Mongoose.Schema;


var emailValidator = validate({
	validator: 'isEmail',
	message: 'is not a valid email address.'
})

var schema = new Schema({
	email: {type: String, unique: true, required: true, validate: emailValidator},
	name: { type: String, required: true },
	phone: phone,
	address: address,
	bio: { type: String },
	active: {type: Boolean, default: true}
});

module.exports = Mongoose.model('Customer', schema);