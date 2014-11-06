var stripe = require('stripe')('sk_test_oDJJuKvbOfKyEkIEQLFH6tWZ'),
	orderService = require('../services/order-service');

module.exports.submitStripe = function(req, res){
	var stripeToken = req.body.id;
	orderService.getOne(req).then(function(data){
		var charge = stripe.charges.create({
		  amount: data.totalCost*100,
		  currency: "usd",
		  card: stripeToken,
		  description: data.customer._id + ' paying for order ' + data._id
		}, function(err, data) {
		  if (err) res.send(err);
		  res.send(data);
		});
	})
};