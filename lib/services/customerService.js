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
	var query = Customer.where({_id: req.params.id});
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
};

module.exports.addAddress = function(req, change){
	var deferred = Q.defer();
	Customer.findOne({_id: req.params.id}, function(err, user){
		if(err) deferred.reject(new Error(err));
		user.address.addToSet(change);
		user.save(function(err, data){
			deferred.resolve(data);
		});
	});
	return deferred.promise;
};

module.exports.addOrder = function(userId, order){
	var deferred = Q.defer();
	Customer.findOne({_id: userId}, function(err, user){
		if(err) deferred.reject(new Error(err));
		var newOrder = {
			ref: order
		}
		user.orders.addToSet(newOrder);
		user.save(function(err, data){
			deferred.resolve(data);
		});
	});
	return deferred.promise;
};

module.exports.deleteAddy = function(req){
	var deferred = Q.defer();
	Customer.findOne({_id: req.params.id}).exec(function(err, data){
		data.address.pull({_id: req.params.addyId})
		data.save(function(err, data){
			if(err) return deferred.reject(new Error(err));
			return deferred.resolve(data);
			console.log(err, data);
		})
	});
	return deferred.promise;
}