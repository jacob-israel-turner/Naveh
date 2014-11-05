var app = angular.module('navehApp');

app.service('orderService', function($http){
	this.getOrders = function(){
		return $http({
			method: 'GET',
			url: '/api/orders'
		})
	}
});