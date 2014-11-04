var customerService = require('../services/customerService');

module.exports.get = function(req, res){
	customerService.getAll()
		.then(function(customers){
			res.json(customers);
		}).catch(function(err){
			res.status(500).json(err);
		});
};
module.exports.getOne = function(req, res){
	customerService.getOne(req)
		.then(function(customer){
			res.json(customer)
		}).catch(function(err){
			res.status(500).json(err);
		})
};
module.exports.post = function(req, res) {
	customerService.post(req)
		.then(function(data){
			res.json(data[0].name + ' has been created.');
		}).catch(function(err){
			res.status(500).json(err);
		});
};
module.exports.put = function(req, res) {
	var change = req.body;
	customerService.put(req, change)
		.then(function(data){
			res.json(data);
		}).catch(function(err){
			res.status(500).json(err);
		});
};
module.exports.delete = function(req, res){
	customerService.delete(req)
		.then(function(data){
			res.json('User had been deleted');
		}).catch(function(err){
			res.satus(500).json(err);
		});
};
module.exports.addAddress = function(req, res) {
	var change = req.body;
	console.log(change);
	customerService.addAddress(req, change)
		.then(function(data){
			res.json(data);
		}).catch(function(err){
			res.status(500).json(err);
		});
};