var app = angular.module('navehApp');

app.controller('ordersCtrl', function($scope, orderService){
	orderService.getOrders().then(function(data){
		$scope.orders = data.data;
		console.log($scope.orders);
	});
});