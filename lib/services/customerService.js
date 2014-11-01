var promise = require('bluebird'),
	Q = require('q'),
	Customer = require('../models/customer');

promise.promisifyAll(Customer);
promise.promisifyAll(Customer.prototype);

module.exports.getAll = function(){
	return Customer.findAsync();
};

module.exports.getOne = function(req){
	var deferred = Q.defer();
	var query = Customer.where({_id: req.params.id})
	query.findOne(function(err, data){
		if(err) return deferred.reject(new Error (err));
		return deferred.resolve(data);
	});
	return deferred.promise;
}

module.exports.post = function(req){
	var customer = new Customer(req.body);
	return customer.saveAsync();
};

module.exports.put = function(req, change){
	return Customer.findOneAndUpdateAsync({_id: req.params.id}, change);
};

module.exports.delete = function(req){
	return Customer.removeAsync({_id: req.params.id});
}