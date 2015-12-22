var _     = require('underscore')
  , _prop
  ;

function calculate(items) {
  // optimization controls
  if (thereAreNo(items)) {
    return [];
  }

  items = getOnlyValidItems(items);

  return calculateWeights(items);
}

function getOnlyValidItems(items) {
  return _.reject(items, function(item) {
    return  item === undefined
      ||    item === null
      ||    !_.has(item, _prop)
      ||    typeof(item[_prop]) !== 'number'
      ||    isNaN(item[_prop])
      ;
  });
}

function calculateWeights(items) {
  var total     = sum(items);

  _.each(items, function(item) {
    item.weight = getItemWeight(item[_prop], total);
  });

  return items;
}

function getItemWeight(prop, total) {
  prop = applyZeroRule(prop);

  if (prop <= 0 || total <= 0) {
    return 0.0;
  }
  return prop / total;
}

function sum(items) {
  return _.reduce(items, function(memo, item) {
    return memo + applyZeroRule(item[_prop]);
  }, 0);
}

function applyZeroRule(prop) {
  if (prop < 0) {
    prop = 0;
  }
  return prop;
}

function thereAreNo(items) {
  return !items || items.length === 0;
}

module.exports = function(opts) {
  // with what to calculate upon
  _prop = opts && opts.prop;

  if (typeof _prop === 'undefined'
  ||  typeof _prop !== 'string'
  ||  _prop == null) {
    throw new Error('Weighter: A weight calculating property should be specified!');
  }

  return {
    calculate: calculate
  }
};
