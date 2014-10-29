var app = angular.module('navehApp');

//The purpose of this service is to create, read, update,
//and delete INGREDIENTS from the database.

app.service('ingredientService', function($http, $routeParams){
	this.getAll = function(){
		return $http({
			method: 'GET',
			url: 'http://localhost:9012/api/ingredients'
		})
	};
	this.getOne = function(){
		return $http({
			method: 'GET',
			url: 'http://localhost:9012/api/ingredients/' + $routeParams.name
		})
	};
	this.newIngr = function(ingr){
		return $http({
			method: 'POST',
			url: '/api/ingredients',
			data: ingr
		})
	};
	this.editIngr = function(ingr){
		return $http({
			method: 'PUT',
			url: '/api/ingredients/' + $routeParams.name,
			data: ingr
		})
	}
})