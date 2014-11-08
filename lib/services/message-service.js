var mandrill = require('mandrill-api/mandrill'),
	Q = require('q'),
	mandrill_client = new mandrill.Mandrill('DfWbXEQztAR6ddOGgUs3Sw');

module.exports.sendMessage = function(data){
	var deferred = Q.defer();
	var data = data.body; //TEMPORARY, FOR TESTING
	var message = {
		"text": data.body,
		"subject": data.subject,
		"from_email": data.from_email,
		"from_name": data.from_name,
		"to": data.to
	}
	var async = false;
	var ip_pool = "Main Pool";
	var send_at = "example send_at";
	mandrill_client.messages.send({
		"message": message,
		"async": async,
		"ip_pool": ip_pool
		// "send_at": send_at
	},
		function(result){
			console.log(result);
			deferred.resolve(result);
		}, function(e){
			console.log(e);
			deferred.reject(new Error(e));
		}
	)
	return deferred.promise;
};