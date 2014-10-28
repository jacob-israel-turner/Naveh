//NOTES: Using this for validation: https://github.com/leepowellcouk/mongoose-validator
//Different than mongoose-validate


var Express = require('express'),
	Mongoose = require('mongoose'),
	favicon = require('serve-favicon'),
	bodyParser = require('body-parser');

var port = 9012,
	mongoUri = 'mongodb://localhost:27017/naveh',
	connection = Mongoose.connection,
	app = Express();


// var Customer = require('./lib/models/customer');

//controllers:
var customerController = require('./lib/controllers/customerController'),
	productController = require('./lib/controllers/productController'),
	ingredientController = require('./lib/controllers/ingredient-controller'),
	orderController = require('./lib/controllers/order-controller');


//connecting to mongodb
Mongoose.connect(mongoUri);

connection.once('open', function(){
	console.log('Connected to the Database at: ' + mongoUri)
})


//connecting to client
app.listen(port, function(){
	console.log('Now listening on port: ' + port);
});

//MIDDLEWARE
app.use(favicon(__dirname + '/public/attachments/favicon.ico'));
app.use(bodyParser.json());
app.use(Express.static(__dirname + '/public'));


//ENDPOINTS
//customers
app.get('/customers', customerController.get);

app.post('/customers', customerController.post);

app.put('/customers/:id', customerController.put);

app.delete('/customers/:id', customerController.delete);

//products
app.get('/products', productController.get);

app.post('/products', productController.post);

app.put('/products/:id', productController.put);

app.delete('/products/:id', productController.delete);

//ingredients
app.get('/ingredients', ingredientController.get);

app.post('/ingredients', ingredientController.post);

app.put('/ingredients/:id', ingredientController.put);

app.delete('/ingredients/:id', ingredientController.delete);

//orders
app.post('/orders', orderController.post);

app.get('/orders', orderController.get);

app.put('/orders/:id', orderController.put);

app.delete('/orders/:id', orderController.delete);

//to do: finish angular routes, populate ingredients and products pages.

