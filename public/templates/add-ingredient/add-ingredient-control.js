var app = angular.module('navehApp');

app.controller('addIngredientCtrl', function($scope, productService, ingredientService){
	productService.getAll().then(function(data){
		$scope.products = data.data;
		console.log($scope.products);
	});

	$scope.results = false;

	$scope.clearIngredient = function(){
		$scope.newIngr = {
			name: '',
			info: '',
			benefits: '',
			products: [],
			active: true
		};
	}

	$scope.submitIngredient = function(){
		$scope.newIngr.benefits = $scope.newIngr.benefits.split(',');
		for(var i = 0; i < $scope.newIngr.benefits.length; i++){
			$scope.newIngr.benefits[i] = $scope.newIngr.benefits[i].trim();
		}
		console.log($scope.newIngr);
		ingredientService.newIngr($scope.newIngr).success(function(data){
			$scope.clearIngredient();
			console.log(data);
			$scope.results = data.data;
		})
		.error(function(data){
			console.log(data);
			$scope.results = data.message;
			$scope.resultsStyle = {color:'red'};
		})
	}

	$scope.toggleSelection = function(prodId){
		var idx = $scope.newIngr.products.indexOf(prodId);
		if(idx > -1){
			$scope.newIngr.products.splice(idx, 1);
		}

		else {
			$scope.newIngr.products.push(prodId);
		}
	}

	$scope.clearIngredient();
});