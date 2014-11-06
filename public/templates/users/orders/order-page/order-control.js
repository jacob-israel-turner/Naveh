var app = angular.module('navehApp');

app.controller('orderCtrl', function($scope, $routeParams, orderService){
	orderService.getOrder($routeParams.id).then(function(data){
		$scope.order = data.data;
		console.log($scope.order);
	})
})