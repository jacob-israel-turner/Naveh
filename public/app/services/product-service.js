var app = angular.module('navehApp');

//The purpose of this service is to create, read, update,
//and delete PRODUCTS from the database.

app.service('productService', function($http, $routeParams){
	this.getAll = function(){
		return $http({
			method: 'GET',
			url: '/api/products'
		})
	};
	this.getOne = function(){
		return $http({
			method: 'GET',
			url: '/api/products/' + $routeParams.name
		})
	};
	this.newProd = function(prod){
		return $http({
			method: 'POST',
			url: '/api/products',
			data: prod
		})
	};
	this.editProd = function(prod){
		return $http({
			method: 'PUT',
			url: '/api/products/' + prod.name,
			data: prod
		})
	};
});