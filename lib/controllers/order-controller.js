var orderService = require('../services/order-service');

module.exports.get = function(req, res){
	orderService.getAll()
		.then(function(data){
			res.json(data);
		}).catch(function(err){
			res.status(500).json(err);
		});
};
module.exports.post = function(req, res) {
	orderService.post(req)
		.then(function(data){
			res.json('Order ' + data[0]._id + ' has been created.');
		}).catch(function(err){
			res.status(500).json(err);
		});
};
module.exports.put = function(req, res) {
	var change = req.body;
	orderService.put(req, change)
		.then(function(data){
			res.json(data);
		}).catch(function(err){
			res.status(500).json(err);
		});
};
module.exports.delete = function(req, res){
	orderService.delete(req)
		.then(function(data){
			res.json('Order had been deleted');
		}).catch(function(err){
			res.satus(500).json(err);
		});
};