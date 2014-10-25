var customerService = require('../services/customerService');

module.exports.get = function(req, res){
	customerService.getAll()
		.then(function(customers){
			res.json(customers);
		}).catch(function(err){
			res.status(500).json(err);
		})
};

