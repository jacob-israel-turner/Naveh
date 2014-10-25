var Express = require('express'),
	Mongoose = require('mongoose'),
	bodyParser = require('body-parser');

var port = 9012,
	mongoUri = 'mongodb://localhost:27017/naveh',
	connection = Mongoose.connection,
	app = Express();

var Customer = require('./lib/models/customer');

var customerService = require('./lib/controllers/customerController');


Mongoose.connect(mongoUri);

connection.once('open', function(){
	console.log('Connected to the Database at: ' + mongoUri)
})

app.listen(port, function(){
	console.log('Now listening on port: ' + port);
});

app.get('/customers', customerService.get);

// var jim = new Customer({
// 		name: 'Jim',
// 		email: "Jim's email",
// 		phone: {
// 			number: '12086503463'
// 		},
// 		address: {
// 			address: '122 S 350 E',
// 			city: 'Burley',
// 			state: 'ID',
// 			zip: 83318
// 		},
// 		billingInfo: {
// 			number: 1234567890123456,
// 			name: 'Jacob Turner',
// 			exp: 'November 2016',
// 			ccv: 123,
// 			address: {
// 				address: '122 S 350 E',
// 				city: 'Burley',
// 				state: 'ID',
// 				zip: 83318
// 			}
// 		},
// 		bio: "Hi!  I'm Jim!  :)"
// 	});

// 	jim.save(function(err){
// 		if(err) {
// 			console.log(err);
// 		}
// 		console.log('Jim was created!  :)');
// 	})