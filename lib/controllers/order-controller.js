var orderService = require('../services/order-service');

module.exports.get = function(req, res){
	orderService.getAll()
		.then(function(data){
			res.json(data);
		}).catch(function(err){
			res.status(500).json(err);
		});
};
module.exports.post = function(req, res) {
	var products = [];
	console.log(req.body.cart);
	for (var i = req.body.cart.length - 1; i >= 0; i--) {
		products.push({
			product: req.body.cart[i]._id,
			quantity: req.body.cart[i].amount,
			price: req.body.cart[i].price
		})
	};
	var order = {
		customer: req.body.customer,
		products: products,
		shippingAddy: req.body.shippingAddy,
		
	}
	orderService.post(order)
		.then(function(data){
			console.log(data);
			res.json('Order ' + data[0]._id + ' has been created.');
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