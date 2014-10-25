var promise = require('bluebird'),
	Customer = require('../models/customer');

promise.promisifyAll(Customer);
promise.promisifyAll(Customer.prototype);

module.exports.getAll = function(){
	return Customer.findAsync();
};