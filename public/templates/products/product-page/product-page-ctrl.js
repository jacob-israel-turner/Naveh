var app = angular.module('navehApp');

app.controller('productCtrl', function($scope, productService, shoppingService){
	productService.getOne().then(function(data){
		$scope.product = data.data;
	})
	$scope.addAmount = 1;
	$scope.addToCart = function(){
		if(!$scope.addAmount || $scope.addAmount > 99){
			$scope.message = 'Must enter a number between 1 and 99.';
		} else {
			$scope.message = '';
			var product = {
				item: $scope.product._id,
				price: $scope.product.price,
				amount: $scope.addAmount
			}
			shoppingService.addToCart(product, $scope.user._id).then(function(data){
				console.log(data);
				$scope.message = $scope.product.name + ' was added to your cart.'
			})
		}
	}
});