var messageService = require('../services/message-service');

module.exports.sendMessage = function(req, res){
	messageService.sendMessage(req).then(function(data){
		res.json(data);
	})
}
module.exports.sendReceipt = function(data){
	var message = {}
	message.body = {
			"body":"This message is to confirm that your order has been submitted, and payment has been recieved. Your order confirmation number is " + data._id +".",
			"subject":"Your Naveh order",
			"from_email":"team@jacobisraelturner.com",
			"from_name":"Jacob Turner",
			"to":[{
				"email": data.customer.email[0],
				"name": data.customer.name,
				"type":"to"
		}]
	}
	messageService.sendMessage(message).then(function(response){
		res.json(response);
	})
}