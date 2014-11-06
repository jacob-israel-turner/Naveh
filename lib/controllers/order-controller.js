var orderService = require('../services/order-service'),
	cartService = require('../services/cart-service');

module.exports.get = function(req, res){
	orderService.getAll()
		.then(function(data){
			res.json(data);
		}).catch(function(err){
			res.status(500).json(err);
		});
};
module.exports.getOne = function(req, res){
	orderService.getOne(req)
		.then(function(data){
			res.json(data);
		}).catch(function(err){
			res.status(500).json(err);
		});
};
module.exports.post = function(req, res) {
	var products = [];
	for (var i = req.body.cart.length - 1; i >= 0; i--) {
		products.push({
			ref: req.body.cart[i].item._id,
			quantity: req.body.cart[i].amount,
			price: req.body.cart[i].price
		})
	};
	var order = {
		customer: req.body.customer,
		products: products,
		shippingAddy: req.body.shippingAddy,
		totalCost: req.body.totalCost
	}
	orderService.post(order)
		.then(function(data){
			cartService.delete(req.body.customer).then(function(customer){
				res.json(data);
			}).catch(function(err2){
				console.log(err2);
				res.status(500).json(err2);
			})
		}).catch(function(err){
			console.log(err);
			res.status(500).json(err);
		});
};
module.exports.put = function(req, res) {
	var change = req.body;
	orderService.put(req, change)
		.then(function(data){
			res.json(data);
		}).catch(function(err){
			res.status(500).json(err);
		});
};
module.exports.delete = function(req, res){
	orderService.delete(req)
		.then(function(data){
			res.json('Order had been deleted');
		}).catch(function(err){
			res.satus(500).json(err);
		});
};