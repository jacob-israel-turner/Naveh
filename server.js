//NOTES: Using this for validation: https://github.com/leepowellcouk/mongoose-validator
//Different than mongoose-validate


var Express = require('express'),
	Mongoose = require('mongoose'),
	favicon = require('serve-favicon'),
	passport = require('passport'),
	cors = require('cors'),
	User = require('./lib/models/customer'),
	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
	bodyParser = require('body-parser');

var port = 9012,
	mongoUri = 'mongodb://localhost:27017/naveh',
	connection = Mongoose.connection,
	app = Express();

//serialize user for session
passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(obj, done) {
	User.findById(obj.id, function(err, user){
		done(err, user);
	})
});

//controllers:
var customerController = require('./lib/controllers/customerController'),
	productController = require('./lib/controllers/productController'),
	ingredientController = require('./lib/controllers/ingredient-controller'),
	orderController = require('./lib/controllers/order-controller');

//services:
var authService = require('./lib/services/auth-service.js');

//connecting to mongodb
Mongoose.connect(mongoUri);

connection.once('open', function(){
	console.log('Connected to the Database at: ' + mongoUri)
})


//connecting to client
app.listen(port, function(){
	console.log('Now listening on port: ' + port);
});

//AUTHENTICATION
//google oAuth2
passport.use(new GoogleStrategy({ //This sets up/defines the Google authentication strategy.
	clientID: '170338434875-eqh886fsse5anq14nj6ck2rnqjncsig3.apps.googleusercontent.com',
	clientSecret: 'hWFISrL1NZeya4Mc-fQg8WSl',
	callbackURL: 'http://localhost:9012/auth/google/callback'
}, function(accessToken, refreshToken, profile, done){
	authService.googleAuth(profile).then(function(user){
		return done(null, user);
	}).fail(function(err){
		return done(err);
	})
}));

var authenticateUser = function(req, res, next) {
  passport.authenticate('google', function(err, user, info) {
    if (!user) {
      return res.status(401).end();
    }
    req.logIn(user, function(err) {
      return res.status(200).end();
    });
  })(req, res, next);
}

var requireAuth = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).end();
  }
  next();
};


//MIDDLEWARE
app.use(favicon(__dirname + '/public/attachments/favicon.ico'));
app.use(bodyParser.json());
// app.use(allowCrossDomain);
app.use(cors());
app.use(Express.static(__dirname + '/public'));

app.use(passport.initialize());
app.use(passport.session());


//ENDPOINTS

//authentication (login, register);
//google
app.get('/auth/google', 
	passport.authenticate('google', {scope: 'openid profile email https://www.googleapis.com/auth/plus.login'}));

app.get('/auth/google/callback',
	passport.authenticate('google', {failureRedirect: '/#/register', successRedirect: '/#/products'}),
	function(req, res){
		console.log(req);
		// res.redirect('/');
	});

app.post('/api/auth', authenticateUser); //use this to log a 
									//user in. pretty much does
									//what /auth/google does...

app.post('/api/logout', function(req, res){ //logs a user out
	req.logout();
	return res.status(200).end();
});

app.get('/api/user/me', requireAuth, function(req, res) {
  return res.json(req.user); 
});											//gets a user's data

//customers
app.get('/api/customers', customerController.get);

app.post('/api/customers', customerController.post); //register

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