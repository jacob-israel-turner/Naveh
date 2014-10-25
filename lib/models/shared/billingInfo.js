var address = require('./address');

module.exports = {
	number: { type: Number, required: true },
	name: { type: String, required: true },
	exp: { type: String, required: true },
	ccv: {type: Number, required: true },
	address: address
}