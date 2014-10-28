var productService = require('../services/product-service');

module.exports.get = function(req, res){
	productService.getAll()
		.then(function(err, data){
			if(err)res.json(err);
			res.json(data);
		})/*.catch(function(err){
			res.status(500).json(err);
		});*/
};
module.exports.post = function(req, res) {
	productService.post(req)
		.then(function(data){
			res.json(data[0].name + ' has been created.');
		}).catch(function(err){
			res.status(500).json(err);
		});
};
module.exports.put = function(req, res) {
	var change = req.body;
	productService.put(req, change)
		.then(function(data){
			res.json(data);
		}).catch(function(err){
			res.status(500).json(err);
		});
};
module.exports.delete = function(req, res){
	productService.delete(req)
		.then(function(data){
			res.json('Product had been deleted');
		}).catch(function(err){
			res.satus(500).json(err);
		});
};
