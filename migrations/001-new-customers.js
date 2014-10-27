var Customer = require('../lib/models/customer');

require('../server');


exports.up = function(next){
// 	var jim = new Customer({
// 		name: 'Jim',
// 		email: "Jim's email",
// 		phone: {
// 			number: '12086503463'
// 		},
// 		address: {
// 			address: '122 S 350 E',
// 			city: 'Burley',
// 			state: 'ID',
// 			zip: 83318
// 		},
// 		billingInfo: {
// 			number: 1234567890123456,
// 			name: 'Jacob Turner',
// 			exp: 'November 2016',
// 			ccv: 123,
// 			address: {
// 				address: '122 S 350 E',
// 				city: 'Burley',
// 				state: 'ID',
// 				zip: 83318
// 			}
// 		},
// 		bio: "Hi!  I'm Jim!  :)"
// 	});

// 	jim.save(function(err){
// 		if(err) {
// 			console.log(err);
// 			next(err);
// 		}
// 		console.log('Jim was created!  :)');
//   		next();
// 	})
// };

exports.down = function(next){
  next();
};
