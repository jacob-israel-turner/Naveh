var app = angular.module('navehApp');

app.controller('addProductCtrl', function($scope, ingredientService, productService){
	ingredientService.getAll().then(function(data){
		$scope.ingredients = data.data;
		console.log($scope.ingredients);
	});

	$scope.results = false;
	$scope.clearProduct = function(){
		$scope.newProd = {
			name: '',
			info: '',
			price: '',
			size: '',
			ingredients: [],
			active: true
		};
	}

	$scope.submitProduct = function(){
		$scope.newProd.price = Number($scope.newProd.price);
		$scope.newProd.size = Number($scope.newProd.size);
		console.log($scope.newProd);
		productService.newProd($scope.newProd).success(function(data){
			$scope.clearProduct();
			console.log(data);
			$scope.results = data.data;
		})
		.error(function(data){
			console.log(data);
			$scope.results = data.message;
			$scope.resultsStyle = {color:'red'};
		})
	}

	$scope.toggleSelection = function(ingrId){
		var idx = $scope.newProd.ingredients.indexOf(ingrId);
		if(idx > -1){
			$scope.newProd.ingredients.splice(idx, 1);
		}

		else {
			$scope.newProd.ingredients.push(ingrId);
		}
	}

	$scope.clearProduct();
});