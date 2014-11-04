var app = angular.module('navehApp');

app.controller('checkoutCtrl', function($scope, $rootScope, userService, shoppingService){
	// $scope.$on('user-loaded', function(){
	// 	console.log("I'm loaded");
	// })
	$scope.showNewAddress = false;
	$scope.totalPrice = 0;
	for (var i = $scope.user.cart.length - 1; i >= 0; i--) {
		if(typeof $scope.user.cart[i].price === 'number') {
			$scope.totalPrice += $scope.user.cart[i].price;
		}
	};
	$scope.clearAddy = function(){
		console.log($scope.newAddy);
		$scope.newAddy = {};
		$scope.results = '';
	};
	$scope.submitAddy = function(){
		// if(typeof $scope.newAddy.zip !== 'number'){
		// 	$scope.results = 'Zip code must be a 5-digit number.'
		// 	return;
		// }
		$scope.newAddy.zip = Number($scope.newAddy.zip);
		console.log($scope.newAddy);
		userService.addAddy($scope.newAddy, $scope.user._id).then(function(data){
			console.log(data);
			location.reload();
		});
	}
	$scope.submitOrder = function(){
		shoppingService.submitOrder($scope.user._id, $scope.user.cart, $scope.selectedAddress)
			.then(function(data){
				$scope.results = data.data;
				$rootScope.$broadcast('update-user');
			})
	}
});