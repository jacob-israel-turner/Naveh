var promise = require('bluebird'),
	Product = require('../models/product');

promise.promisifyAll(Product);
promise.promisifyAll(Product.prototype);

module.exports.getAll = function(){
	return Product.findAsync();
};

module.exports.getOne = function(req){
	return Product.findOne({name: req.params.name}).populate('ingredients').exec(function(err, data){
		return data;
	});
}

module.exports.post = function(req){
	var product = new Product(req.body);
	return product.saveAsync();
};

module.exports.put = function(req, change){
	return Product.findOneAndUpdateAsync({name: req.params.name}, change);
};

module.exports.delete = function(req){
	return Product.removeAsync({_id: req.params.id});
};