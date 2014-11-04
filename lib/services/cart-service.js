var Customer = require('../models/customer'),
	Q = require('q');

module.exports.get = function(req){
	var deferred = Q.defer();
	Customer.find({_id: req.params.id}).populate('cart.item').exec(function(err, data){
		if(err) return deferred.reject(new Error(err));
		return deferred.resolve(data[0].cart);
	});
	return deferred.promise;
};
module.exports.put = function(req){
	var deferred = Q.defer();
	Customer.find({_id: req.params.id}).exec(function(err, data){
		if(err) return deferred.reject(new Error(err));
		var cust = data[0];
		// var toAdd = req.body;
		// for(var i = 0, len = toAdd.length; i < len; i++){
		// 	cust.cart.push(toAdd[i]);
		// }
		cust.cart.push(req.body);
		cust.save(function(err, cust, success){
			if(err) return deferred.reject(new Error(err));
			if(success === 0) deferred.reject(new Error('Cart Not Saved'));
			return deferred.resolve(cust);
		})
	});
	return deferred.promise;	
}