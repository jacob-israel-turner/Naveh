var app = angular.module('navehApp');

app.controller('editProductCtrl', function($location, $scope, ingredientService, productService){
	ingredientService.getAll().then(function(data){
		$scope.ingredients = data.data;
	});
	var getProduct = function(){
		productService.getOne().then(function(data){
			for(var i = 0; i < data.data.ingredients.length; i++){
				data.data.ingredients[i] = data.data.ingredients[i]._id;
			}
			data.data.price = data.data.price/100;
			$scope.product = data.data;
		});
	};
	getProduct();
	$scope.submitProduct = function(){
		delete $scope.product._id;
		$scope.product.price = Number($scope.product.price)*100;
		$scope.product.size = Number($scope.product.size);
		console.log($scope.product);
		productService.editProd($scope.product).success(function(data){
			console.log(data);
			$scope.results = data.name + ' has successfully been updated.';
			getProduct();
		})
		.error(function(data){
			console.log(data);
			$scope.results = data.message;
			$scope.resultsStyle = {color:'red'};
		})
	}
	$scope.toggleSelection = function(ingrId){
		var idx = $scope.product.ingredients.indexOf(ingrId);
		if(idx > -1){
			$scope.product.ingredients.splice(idx, 1);
		}

		else {
			$scope.product.ingredients.push(ingrId);
		}
	}
});