var app = angular.module('navehApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
	$routeProvider
		.when('/', {
			templateUrl: '../templates/home/main.html',
			controller: 'homeCtrl'
		})
		.when('/products', {
			templateUrl: '../templates/products/products.html',
			controller: 'productsCtrl'
		})
		.when('/products/:name', {
			templateUrl: '../templates/product-page/product-page.html',
			controller: 'productCtrl'
		})
		.when('/ingredients', {
			templateUrl: '../templates/ingredients/ingredients.html',
			controller: 'ingredientsCtrl'
		})
		.when('/ingredients/:name', {
			templateUrl: '../templates/ingredient-page/ingredient-page.html',
			controller: 'ingredientCtrl'
		})
		.otherwise({
			redirectTo: '/'
		})
		$locationProvider.html5Mode(true);
});

//To do: fix routes.  When going deeper than one level, the .css
//and other files don't load correctly, but only if you load from
//that page.  However, if you reach that page by changing routes
//(no refresh), it will keep the proper css.
//lines 82-85 are catching only the second level pages
//('/products/test') not those only one deep ('/products')
//That's good.  That'll be how to fix it.