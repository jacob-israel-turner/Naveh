var cartService = require('../services/cart-service');

module.exports.get = function(req, res){
	cartService.get(req).then(function(data){
		res.json(data);
	}).catch(function(err){
		res.status(500).json(err);
	})
};
module.exports.put = function(req, res){
	cartService.put(req).then(function(data){
		res.json(data);
	}).catch(function(err){
		console.log(err);
		res.status(500).json(err);
	})
}