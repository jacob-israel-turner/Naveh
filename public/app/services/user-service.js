var app = angular.module('navehApp');

app.service('userService', function($http){
	this.googleAuthenticate = function(){
		return $http({
			method: 'GET',
			url: '/auth/google'
		})
	}
});