var Mongoose = require('mongoose'),
	objectId = Mongoose.Schema.Types.ObjectId;

module.exports = {
	name: {type: String, uniqueness: true, required: true },
	price: { type: Number, required: true },
	size: {type: Number, required: true },
	ingredients: [{type: objectId, ref: 'Ingredient', required: true }],
	info: { type: String },
	image: { type: String },
	active: {type: Boolean, default: true}
}