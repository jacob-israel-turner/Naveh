var stripe = require('stripe')('sk_test_oDJJuKvbOfKyEkIEQLFH6tWZ'),
	messageController = require('./message-controller'),
	orderService = require('../services/order-service');

module.exports.submitStripe = function(req, res){
	var stripeToken = req.body.id;
	orderService.getOne(req).then(function(order){
		var charge = stripe.charges.create({
		  amount: order.totalCost*100,
		  currency: "usd",
		  card: stripeToken,
		  description: order.customer._id + ' paying for order ' + order._id
		}, function(err, data) {
		  if(err) res.send(err);
		  order.payment.status = 'paid';
		  order.payment.confirmation = data.id;
		  order.save(function(err, saveData){
		  	if(err) res.send(err)
		  	messageController.sendReceipt(saveData);
		  	res.send(saveData);
		  })
		});
	})
};