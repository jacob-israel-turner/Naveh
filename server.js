//NOTES: Using this for validation: https://github.com/leepowellcouk/mongoose-validator
//Different than mongoose-validate

var Express = require('express'),
	Mongoose = require('mongoose'),
	favicon = require('serve-favicon'),
	passport = require('passport'),
	cors = require('cors'),
	cookieParser = require('cookie-parser'),
	expressSession = require('express-session'),
	User = require('./lib/models/customer'),
	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
	stripe = require('stripe')('')
	bodyParser = require('body-parser');

var port = 80,
	mongoUri = 'mongodb://localhost:27017/naveh',
	connection = Mongoose.connection,
	app = Express();

//AUTHENTICATION
//google oAuth2
passport.use(new GoogleStrategy({ //This sets up/defines the Google authentication strategy.
	clientID: '170338434875-eqh886fsse5anq14nj6ck2rnqjncsig3.apps.googleusercontent.com',
	clientSecret: 'hWFISrL1NZeya4Mc-fQg8WSl',
	callbackURL: 'http://localhost:9012/auth/google/callback'
}, function(accessToken, refreshToken, params, profile, done){
	authService.googleAuth(profile).then(function(user){
		return done(null, user);
	}).fail(function(err){
		return done(err);
	})
}));
//serialize user for session
passport.serializeUser(function(user, done) {
	if(Array.isArray(user)) user = user[0];
	done(null, user._id);
});
passport.deserializeUser(function(id, done) {
	User.findById(id).populate('cart.item').populate('orders.ref').exec(function(err, user){ //I 'think' this checks
		done(err, user); //the cookie in the req object, then 
	}) //parses (deserializes) it to tell if they're authenticated
}); //or not.  Then it sticks the user info in req.user. cool!

//Require auth for the endpoint
var requireAuth = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).end();
  }
  next();
};

//IMPORTS
//controllers:
var customerController = require('./lib/controllers/customerController'),
	productController = require('./lib/controllers/productController'),
	ingredientController = require('./lib/controllers/ingredient-controller'),
	orderController = require('./lib/controllers/order-controller'),
	paymentController = require('./lib/controllers/payment-controller'),
	cartController = require('./lib/controllers/cart-controller');

//services:
var authService = require('./lib/services/auth-service.js');


//CONNECTING
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
app.use(Express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(expressSession({ secret: 'bridge of wood' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(favicon(__dirname + '/public/attachments/favicon.ico'));



//ENDPOINTS

//authentication (login, register);
//google
app.get('/auth/google', 
	passport.authenticate('google', {scope: 'openid profile email https://www.googleapis.com/auth/plus.login'}));

app.get('/auth/google/callback',
	passport.authenticate('google', { failureRedirect: '/register/error', successRedirect: '/'}));

app.post('/api/logout', function(req, res){ //logs a user out
	req.logout();
	return res.status(200).end();
});

app.get('/api/user/me', function(req, res) {
  	return res.json(req.user); 
});										//gets a user's data

//customers
app.get('/api/customers', customerController.get);

app.post('/api/customers', customerController.post);

app.get('/api/customers/:id', customerController.getOne);

app.put('/api/customers/:id', customerController.put);

app.delete('/api/customers/:id', customerController.delete);
//address
app.put('/api/customers/:id/address', customerController.addAddress);

app.delete('/api/customers/:id/address/:addyId', customerController.deleteAddress);

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

app.get('/api/orders/:id', orderController.getOne)

app.put('/api/orders/:id', orderController.put);

app.delete('/api/orders/:id', orderController.delete);
//payment
app.post('/api/orders/:id/payment', paymentController.submitStripe);

//cart
app.get('/api/customers/:id/cart', cartController.get);

app.put('/api/customers/:id/cart', cartController.put);

app.delete('/api/customers/:id/cart', cartController.delete);

//miscellaneous
//This serves the index file, which makes angular's HTML5 mode work properly
app.all('*', function(req, res, next) {
    res.sendFile('/public/index.html', { root: __dirname });
});

//toDo: fix the mess in auth-service.js and customerService.js.  Consolidate
//your promise libraries.  Get rid of bluebird if need be.  Actually, get rid
//of bluebird.
//--https://github.com/jaredhanson/connect-ensure-login
//  implement this later on.
//--figure out error handling, update everything to include it.
//  https://github.com/kriskowal/q  <-- 'Handling Errors' section is good.


//to check lines of code:
//    find: ^.*\S+.*$
//    where: C:\Users\Jacob Turner\DevMountain\naveh, *.php,*.phtml,*.js,*.inc,*.html, -*/node_modules/*