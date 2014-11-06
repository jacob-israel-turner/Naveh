var app = angular.module('navehApp');

app.service('orderService', function($http){
	this.getOrders = function(){
		return $http({
			method: 'GET',
			url: '/api/orders'
		})
	};
	this.getOrder = function(id){
		return $http({
			method: 'GET',
			url: '/api/orders/' + id
		})
	}
});