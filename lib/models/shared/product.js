module.exports = {
	name: {type: String, uniqueness: true, required: true },
	price: { type: Number, required: true },
	size: {type: String, required: true },
	ingredients: {type: String, required: true },
	info: { type: String },
	active: {type: Boolean, default: true}
}