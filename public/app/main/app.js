var app = angular.module('navehApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
	$routeProvider
		.when('/', {
			templateUrl: '/templates/home/main.html',
			controller: 'homeCtrl'
		})
		.when('/products', {
			templateUrl: '/templates/products/products.html',
			controller: 'productsCtrl'
		})
		.when('/products/add', { //needs admin auth
			templateUrl: '/templates/add-product/add-product.html',
			controller: 'addProductCtrl'
		})
		.when('/products/edit/:name', { //needs admin auth
			templateUrl: '/templates/edit-product/edit-product.html',
			controller: 'editProductCtrl'
		})
		.when('/products/:name', {
			templateUrl: '/templates/product-page/product-page.html',
			controller: 'productCtrl'
		})
		.when('/ingredients', {
			templateUrl: '/templates/ingredients/ingredients.html',
			controller: 'ingredientsCtrl'
		})
		.when('/ingredients/add', { //needs admin auth
			templateUrl: '/templates/add-ingredient/add-ingredient.html',
			controller:'addIngredientCtrl'
		})
		.when('/ingredients/edit/:name', { //needs admin auth
			templateUrl: '/templates/edit-ingredient/edit-ingredient.html',
			controller: 'editIngredientCtrl'
		})
		.when('/ingredients/:name', {
			templateUrl: '/templates/ingredient-page/ingredient-page.html',
			controller: 'ingredientCtrl'
		})
		.otherwise({
			redirectTo: '/'
		})
	$locationProvider.html5Mode(true);
});

//To do: create pages to edit products and ingredients.
//THEN create page to create orders
//THEN create page to update orders
//THEN create authentication with login and register pages.
//THEN do some minor front-ending.
//THEN integrate stripe to buy things.
//THEN integrate mandrill to email customers (registration and
//purchase) and the company (registration? and purchase).

//eventually: use 'addToSet' when creating a new product (on its ingredients)
//or ingredient (on its products)
//update price view when viewing individual product.  It's currently
//displaying 100* the price.