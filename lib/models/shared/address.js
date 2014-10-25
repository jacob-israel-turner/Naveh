module.exports = {
	kind: {type: String, enum:['billing', 'shipping', 'both'], default: 'both'},
	address: {type: String, required: true},
	address2: {type: String},
	city: {type: String, required: true},
	state: {type: String, required: true},
	zip: {type: Number, required: true}
}