var app = angular.module('navehApp');

app.service('shoppingService', function($http, $routeParams){
	this.addToCart = function(product, userId){
		return $http({
			method: 'PUT',
			url: '/api/customers/' + userId + '/cart',
			data: product
		})
	}
	this.submitOrder = function(userId, cart, shippingAddy, totalCost){
		console.log(cart);
		var order = {
			customer: userId,
			cart: cart,
			shippingAddy: shippingAddy,
			totalCost: Number(totalCost)
		}
		console.log(order);
		return $http({
			method: 'POST',
			url: '/api/orders',
			data: order
		})
	}
	this.submitStripe = function(token){
		return $http({
			method: 'POST',
			url: '/api/orders/' + $routeParams.id + '/payment',
			data: token
		})
	}
})