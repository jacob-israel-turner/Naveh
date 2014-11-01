var app = angular.module('navehApp');

app.controller('mainCtrl', function($scope, userService){
	userService.getUser().then(function(data){
		$scope.user = data.data;
		console.log($scope.user);
	})
	$scope.logout = function(){
		userService.logout().then(function(data){
			location.reload();
		})
	}
});