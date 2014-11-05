var promise = require('bluebird'),
	Q = require('q'),
	Order = require('../models/Order');

promise.promisifyAll(Order);
promise.promisifyAll(Order.prototype);

module.exports.getAll = function(){
	var deferred = Q.defer();
	Order.find().populate('products.ref').populate('customer').exec(function(err, data){
		if(err) return deferred.reject(new Error(err));
		return deferred.resolve(data);
	});
	return deferred.promise;
};

module.exports.post = function(data){
	var order = new Order(data);
	return order.saveAsync();
};

module.exports.put = function(req, change){
	return Order.findOneAndUpdateAsync({_id: req.params.id}, change);
};

module.exports.delete = function(req){
	return Order.removeAsync({_id: req.params.id});
};



// Order.find().populate('customer').exec(function(err, data){
// 	if(err) console.log(err);
// 	else console.log(data);
// })