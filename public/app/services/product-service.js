var app = angular.module('navehApp');

//The purpose of this service is to create, read, update,
//and delete products from the database.

app.service('productService', function($http){
	this.getAll = function(){
		return $http({
			method: 'GET',
			url: 'http://localhost:9012/api/products'
		})
	}
});