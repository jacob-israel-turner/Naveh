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