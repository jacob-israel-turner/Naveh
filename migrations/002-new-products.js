var Product = require('../lib/models/product');

require('../server');


exports.up = function(next){
	var handCream = new Product({
		name: 'Hand Cream',
		price: 29,
		size: '50 ml',
		ingredients: 'Aloe Vera Juice, Raspberry Seed Oil',
		info: "Highly effective for rough, dry, overworked hands.  An amazing product that provides the skin what it requires to regenerate itself to a healthy, soft, moisturized condition.  Can use as an overall body moisturizer.  Expect excellent results when used."
	});
	
	handCream.save(function(err){
		if(err) {
			console.log(err);
			next(err);
		}
		console.log('Hand cream was created!  :)');
  		next();
	})
};

exports.down = function(next){
  next();
};
