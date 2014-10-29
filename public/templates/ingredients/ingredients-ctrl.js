var app = angular.module('navehApp');

app.controller('ingredientsCtrl', function($scope, ingredientService){
	ingredientService.getAll().then(function(data){
		$scope.ingredients = data.data;
		console.log($scope.ingredients);
	})
})