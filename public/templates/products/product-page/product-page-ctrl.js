var app = angular.module('navehApp');

app.controller('productCtrl', function($scope, productService){
	productService.getOne().then(function(data){
		$scope.product = data.data;
	})
	$scope.addAmount = 1;
	$scope.addToCart = function(){
		if(!$scope.addAmount || $scope.addAmount > 99){
			$scope.error = 'Must enter a number between 1 and 99.';
		} else {
			$scope.error = '';
			console.log($scope.addAmount);
		}
	}
});