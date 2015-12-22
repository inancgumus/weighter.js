var Weighter = require('./weighter');

var items = [
  { id: 1, budget: 75 },
  { id: 2, budget: 25 }
];

// weighter.js will add weight property to the items automatically
var weighter = new Weighter({ prop: 'budget' });

// let's calculate
var result = weighter.calculate(items);

// let's see the result
console.log(result);

// outputs:
//
// [ { id: 1, budget: 75, weight: 0.75 },
//   { id: 2, budget: 25, weight: 0.25 } ]
