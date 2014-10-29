var app = angular.module('navehApp');

app.controller('productCtrl', function($scope, productService){
	productService.getOne().then(function(data){
		$scope.product = data.data;
	})
});