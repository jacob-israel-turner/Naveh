var app = angular.module('navehApp');

app.controller('registerCtrl', function($scope, userService){
	$scope.registerGoogle = function(){
		console.log('test');
		userService.googleAuthenticate().then(function(user){
			console.log(user);
		})
	}
});