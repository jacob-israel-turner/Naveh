var Mongoose = require('mongoose'),
	objectId = Mongoose.Schema.Types.ObjectId,
	Schema = Mongoose.Schema;

var schema = new Schema({
	name: { type: String, required: true, unique: true },
	info: { type: String, required: true },
	benefits: [{ type: String, required: true }],
	products: [{ type: objectId, ref: 'Product'}],
	active: {type: Boolean, default: true}
});

module.exports = Mongoose.model('Ingredient', schema);