var app = angular.module('navehApp');

app.controller('ingredientCtrl', function($scope, ingredientService){
	ingredientService.getOne().then(function(data){
		$scope.ingredient = data.data;
	})
});