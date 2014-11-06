var app = angular.module('navehApp');

app.controller('paymentCtrl', function($scope, $routeParams, shoppingService, orderService){
	orderService.getOrder($routeParams.id).then(function(data){
		$scope.order = data.data;
		console.log(data);
	});
	var handler = StripeCheckout.configure({
	    key: 'pk_test_JQZVLWKQn1Q70xceHd0LLkoK',
	    image: '/attachments/logo_resized.png',
	    token: function(token) {
	      // Use the token to create the charge with a server-side script.
	      // You can access the token ID with `token.id`
	      shoppingService.submitStripe(token).then(function(data){
	      	console.log(data);
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