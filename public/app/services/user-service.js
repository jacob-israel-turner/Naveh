var app = angular.module('navehApp');

app.service('userService', function($http){
	this.getUser = function(){
		return $http({
			method: 'GET',
			url: '/api/user/me'
		})
	}
	this.logout = function(){
		return $http({
			method: 'POST',
			url: '/api/logout'
		})
	}
	this.addAddy = function(addy, userId){
		return $http({
			method: 'PUT',
			url: '/api/customers/' + userId + '/address',
			data: addy
		})
	}
});