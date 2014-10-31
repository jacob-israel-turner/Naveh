var app = angular.module('navehApp');

app.controller('editIngredientCtrl', function($scope, productService, ingredientService){
	productService.getAll().then(function(data){
		$scope.products = data.data;
	});
	var getIngredient = function(){
		ingredientService.getOne().then(function(data){
			for(var i = 0; i < data.data.products.length; i++){
				data.data.products[i] = data.data.products[i]._id;
			}
			data.data.benefits = data.data.benefits.join(', ');
			$scope.ingredient = data.data;
			console.log($scope.ingredient);
		});
	};

	getIngredient();

	$scope.toggleSelection = function(prodId){
		var idx = $scope.ingredient.products.indexOf(prodId);
		if(idx > -1){
			$scope.ingredient.products.splice(idx, 1);
		}

		else {
			$scope.ingredient.products.push(prodId);
		}
	}

	$scope.submitIngredient = function(){
		delete $scope.ingredient._id;
		$scope.ingredient.benefits = $scope.ingredient.benefits.split(',');
		for(var i = 0; i < $scope.ingredient.benefits.length; i++){
			$scope.ingredient.benefits[i] = $scope.ingredient.benefits[i].trim();
		}
		console.log($scope.ingredient);
		ingredientService.editIngr($scope.ingredient).success(function(data){
			console.log(data);
			$scope.results = data.name + ' has successfully been updated.';
		})
		.error(function(data){
			console.log(data);
			$scope.results = data.message;
			$scope.resultsStyle = {color:'red'};
		})
	}
});