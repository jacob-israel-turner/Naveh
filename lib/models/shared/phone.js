module.exports = {
	kind: {type: String, enum: ['home', 'work', 'cell', 'other'], default: 'home'},
	number: { type: String, required: true }
}