var app = angular.module('navehApp');

app.controller('paymentCtrl', function($scope, shoppingService){
	var handler = StripeCheckout.configure({
	    key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
	    image: '/attachments/logo_resized.png',
	    token: function(token) {
	      // Use the token to create the charge with a server-side script.
	      // You can access the token ID with `token.id`
	      shoppingService.submitStripe(token)
	    }
	});
	$scope.pay = function(){
		handler.open({
	      name: 'Naveh',
	      description: 'Skin Care Products',
	      amount: 2000
	    });
	}
})