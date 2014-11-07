var app = angular.module('navehApp');

app.controller('paymentCtrl', function($scope, $routeParams, $location, shoppingService, orderService){
	orderService.getOrder($routeParams.id).then(function(data){
		$scope.order = data.data;
	});
	var handler = StripeCheckout.configure({
	    key: 'pk_test_JQZVLWKQn1Q70xceHd0LLkoK',
	    image: '/attachments/logo_resized.png',
	    token: function(token) {
	      // Use the token to create the charge with a server-side script.
	      // You can access the token ID with `token.id`
	      shoppingService.submitStripe(token).then(function(data){
	      	console.log(data);
	      	alert('Your payment has been received!\nYou will now be redirected to your receipt page.');
	      	$location.path('/orders/' + $scope.order._id)
	      })
	    }
	});
	$scope.pay = function(){
		handler.open({
	      name: 'Naveh',
	      description: 'Skin Care Products',
	      amount: $scope.order.totalCost * 100
	    });
	}
})