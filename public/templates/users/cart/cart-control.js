var app = angular.module('navehApp');

app.controller('cartCtrl', function($scope, $location){
	$scope.go = function(path){
		$location.path(path);
	}
});