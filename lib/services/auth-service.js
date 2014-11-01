var promise = require('bluebird'),
	customerService = require('../services/customerService'),
	Q = require('q'),
	Customer = require('../models/customer');

promise.promisifyAll(Customer);
promise.promisifyAll(Customer.prototype);

module.exports.googleAuth = function(profile) {
	var deferred = Q.defer();
	Customer.findOne({ googleId: profile.id }).exec(function(err, user){
		if (err) return deferred.reject(new Error(err));
		if (user) return deferred.resolve(user);
		var customer = {
			body: {
				email: profile._json.email,
				name: profile._json.name,
				googleId: profile.id,
				googlePic: profile._json.picture
			}
		};
		return deferred.resolve(customerService.post(customer));
	})
	return deferred.promise;
};