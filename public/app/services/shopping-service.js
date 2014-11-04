var app = angular.module('navehApp');

app.service('shoppingService', function($http){
	this.addToCart = function(product, userId){
		return $http({
			method: 'PUT',
			url: '/api/customers/' + userId + '/cart',
			data: product
		})
	}
	this.submitOrder = function(userId, cart, shippingAddy){
		var order = {
			customer: userId,
			cart: cart,
			shippingAddy: shippingAddy
		}
		console.log(order);
		return $http({
			method: 'POST',
			url: '/api/orders',
			data: order
		})
	}
})