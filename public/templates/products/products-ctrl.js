var app = angular.module('navehApp');

app.controller('productsCtrl', function($scope, productService){
	productService.getAll()
		.then(function(data){
			$scope.products = data;
			console.log($scope.products);
		});
});