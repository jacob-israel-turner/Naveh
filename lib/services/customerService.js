var promise = require('bluebird'),
	Customer = require('../models/customer');

promise.promisifyAll(Customer);
promise.promisifyAll(Customer.prototype);

module.exports.getAll = function(){
	return Customer.findAsync();
};

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