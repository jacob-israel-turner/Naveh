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
app.get('/api/customers', customerController.get);

app.post('/api/customers', customerController.post);

app.put('/api/customers/:id', customerController.put);

app.delete('/api/customers/:id', customerController.delete);

//products
app.get('/api/products', productController.get);

app.get('/api/products/:name', productController.getByName);

app.post('/api/products', productController.post);

app.put('/api/products/:name', productController.put);

app.delete('/api/products/:id', productController.delete);

//ingredients
app.get('/api/ingredients', ingredientController.get);

app.get('/api/ingredients/:name', ingredientController.getByName);

app.post('/api/ingredients', ingredientController.post);

app.put('/api/ingredients/:name', ingredientController.put);

app.delete('/api/ingredients/:id', ingredientController.delete);

//orders
app.post('/api/orders', orderController.post);

app.get('/api/orders', orderController.get);

app.put('/api/orders/:id', orderController.put);

app.delete('/api/orders/:id', orderController.delete);

//to do: finish angular routes, populate ingredients and products pages.
// app.all('/*/*', function(req, res, next){
// 	res.sendFile('/public/index.html', { root: __dirname });
// })

app.all('*', function(req, res, next) {
    res.sendFile('/public/index.html', { root: __dirname });
});