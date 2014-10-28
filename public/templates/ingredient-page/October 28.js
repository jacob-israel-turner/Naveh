//create a function that takes an array of objects as an argument and a string that represents a property of an object contained in the array and returns an object whose keys are the properties and whose values are arrays of objects that match that property.

//e.g.
var arr = [{
    name: 'Joe Montana',
    team: '49ers'
}, {
    name: 'Jerry Rice',
    team: '49ers'
}, {
    name: 'Steve Young',
    team: '49ers'
}, {
    name: 'Tony Romo',
    team: 'Cowboys'
}, {
    name: 'Fred Biletnikoff',
    team: 'Raiders'
}, {
    name: 'Dick Butkus',
    team: 'Bears'
}, {
    name: 'Emmitt Smith',
    team: 'Cowboys'
} ];

//code here
function objectify(arr, str) {
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        var key = arr[i][str];
        if(!obj[key]) obj[key] = [];
        obj[key].push(arr[i]);
    }
    return obj;
}
console.log(objectify(arr, 'team'));

//should return:
/*{
    '49ers': [{
        name: 'Joe Montana',
        team: '49ers'
    }, {
        name: 'Jerry Rice',
        team: '49ers'
    }, {
        name: 'Steve Young',
        team: '49ers'
    }],
        'Cowboys': [{
        name: 'Tony Romo',
        team: 'Cowboys'
    }, {
        name: 'Emmitt Smith',
        team: 'Cowboys'
    }],
        'Bears': [{
        name: 'Dick Butkus',
        team: 'Bears'
    }],
        'Raiders': [{
        name: 'Fred Biletnikoff',
        team: 'Raiders'
    }]
}*/