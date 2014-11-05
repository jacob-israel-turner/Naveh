var app = angular.module('navehApp');

app.service('shoppingService', function($http, $routeParams){
	this.addToCart = function(product, userId){
		return $http({
			method: 'PUT',
			url: '/api/customers/' + userId + '/cart',
			data: product
		})
	}
	this.submitOrder = function(userId, cart, shippingAddy){
		console.log(cart);
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
	this.submitStripe = function(token){
		console.log(token, $routeParams.id)
		return $http({
			method: 'POST',
			url: '/api/orders/' + $routeParams.id + '/payment',
			data: token
		})
	}
})