# weighter.js

Use `weighter.js` to easily assign probability weights to your object fields.

This is a tiny library and may help someone out there, I don't know, it helped me.

## Where am I going to use this?

Look at the bare example below. There is a collection named `items`. And the collection stores some items with a `budget` field. Say you want to distribute your results according to the budget. Use `weighter.js` to calculate the weighted probabilities among the budgets. So, you can easily distribute.

Actually, you can do this easily by hand. But, using such a tiny library is beneficial because, it's tested, can be extended and covers the knowledge in one place. Single-Responsibility-Principle is good.

## Bare Example

```javascript
const Weighter = require('./weighter')

let items = [
  { id: 1, budget: 75 },
  { id: 2, budget: 25 }
]

// weighter.js will add weight property to the items automatically
let weighter = new Weighter({ prop: 'budget' })

// let's calculate
let result = weighter.calculate(items)

// let's see the result
console.log(result)

// outputs:
// [ { id: 1, budget: 75, weight: 0.75 },
//   { id: 2, budget: 25, weight: 0.25 } ]
```

## Beware

`Weight.js` modifies the object, so you want to copy it before to make it immutable. (_Note: Maybe I should have add this to the library._)

Also, although this library is used in my production code, it's missing some features that resides in my production code. Maybe, I should take them here sometime. Like: Fetching items according to their weighted probabilities from a collection.

## Test Results

![Test results](https://github.com/inancgumus/weighter.js/blob/master/test-results.png)

## License

The code is released under an MIT license. See the [LICENSE](./LICENSE) file for more information.

## Contributing

Your contributions are very welcome here. I'm waiting for your PRs.

```bash
# fork
npm i
# hack hack hack
npm test
# push
```
