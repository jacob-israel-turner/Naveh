var promise = require('bluebird'),
	Ingredient = require('../models/ingredient');

promise.promisifyAll(Ingredient);
promise.promisifyAll(Ingredient.prototype);

module.exports.getAll = function(){
	return Ingredient.findAsync();
};

module.exports.post = function(req){
	var ingredient = new Ingredient(req.body);
	return ingredient.saveAsync();
};

module.exports.put = function(req, change){
	return Ingredient.findOneAndUpdateAsync({_id: req.params.id}, change);
};

module.exports.delete = function(req){
	return Ingredient.removeAsync({_id: req.params.id});
};