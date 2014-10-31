var app = angular.module('navehApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
	$routeProvider
		.when('/', {
			templateUrl: '/templates/home/main.html',
			controller: 'homeCtrl'
		})
		.when('/register', {
			templateUrl: '/templates/register/register.html',
			controller: 'registerCtrl'
		})
		.when('/products', {
			templateUrl: '/templates/products/products.html',
			controller: 'productsCtrl'
		})
		.when('/products/add', { //needs admin auth
			templateUrl: '/templates/products/add-product/add-product.html',
			controller: 'addProductCtrl'
		})
		.when('/products/edit/:name', { //needs admin auth
			templateUrl: '/templates/products/edit-product/edit-product.html',
			controller: 'editProductCtrl'
		})
		.when('/products/:name', {
			templateUrl: '/templates/products/product-page/product-page.html',
			controller: 'productCtrl'
		})
		.when('/ingredients', {
			templateUrl: '/templates/ingredients/ingredients.html',
			controller: 'ingredientsCtrl'
		})
		.when('/ingredients/add', { //needs admin auth
			templateUrl: '/templates/ingredients/add-ingredient/add-ingredient.html',
			controller:'addIngredientCtrl'
		})
		.when('/ingredients/edit/:name', { //needs admin auth
			templateUrl: '/templates/ingredients/edit-ingredient/edit-ingredient.html',
			controller: 'editIngredientCtrl'
		})
		.when('/ingredients/:name', {
			templateUrl: '/templates/ingredients/ingredient-page/ingredient-page.html',
			controller: 'ingredientCtrl'
		})
		.when('/auth/google',{
			templateUrl: '/templates/register/google-auth.html',
			resolve: {
				reRoute: function(){
					location.reload();
				}
			}
		})
		// .otherwise({
		// 	redirectTo: '/'
		// })
	$locationProvider.html5Mode(true);
});

//toDo: create authentication with login and register pages.
//THEN create page to create orders
//THEN create page to update orders
//THEN do some minor front-ending.
//THEN integrate stripe to buy things.
//THEN integrate mandrill to email customers (registration and
//     purchase) and the company (registration? and purchase).

//eventually: 
//---use 'addToSet' when creating a new product (on its ingredients)
//   or ingredient (on its products)
//---update price view when viewing individual product.  It's currently
//   displaying 100* the price.