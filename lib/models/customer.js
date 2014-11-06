var Mongoose = require('mongoose'),
	validate = require('mongoose-validator'),
	address = require('./shared/address'),
	phone = require('./shared/phone'),
	billing = require('./shared/billingInfo'),
	findOrCreate = require('mongoose-findorcreate'),
	objectId = Mongoose.Schema.Types.ObjectId,
	Schema = Mongoose.Schema;


var emailValidator = validate({
	validator: 'isEmail',
	message: 'is not a valid email address.'
})

var schema = new Schema({
	email: [{type: String, unique: true, required: true, validate: emailValidator}],
	name: { type: String, required: true },
	phone: phone,
	address: [address],
	bio: { type: String },
	googleId: { type: String },
	googlePic: { type: String },
	facebookId: { type: String },
	facebookPic: { type: String },
	cart: [{
		item: { type: objectId, ref: 'Product' },
		amount: { type: Number, min: 1, max: 99 },
		price: { type: Number, min: 1, max: 1000000 }
	}],
	orders: [{
		ref: { type: objectId, ref: 'Order' }
	}],
	active: {type: Boolean, default: true}
});

schema.plugin(findOrCreate);

module.exports = Mongoose.model('Customer', schema);