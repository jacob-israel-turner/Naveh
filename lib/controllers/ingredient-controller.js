var ingredientService = require('../services/ingredient-service');

module.exports.get = function(req, res){
	ingredientService.getAll()
		.then(function(data){
			res.json(data);
		}).catch(function(err){
			res.status(500).json(err);
		});
};
module.exports.post = function(req, res) {
	ingredientService.post(req)
		.then(function(data){
			res.json(data[0].name + ' has been created.');
		}).catch(function(err){
			res.status(500).json(err);
		});
};
module.exports.put = function(req, res) {
	var change = req.body;
	ingredientService.put(req, change)
		.then(function(data){
			res.json(data);
		}).catch(function(err){
			res.status(500).json(err);
		});
};
module.exports.delete = function(req, res){
	ingredientService.delete(req)
		.then(function(data){
			res.json('Ingredient had been deleted');
		}).catch(function(err){
			res.satus(500).json(err);
		});
};