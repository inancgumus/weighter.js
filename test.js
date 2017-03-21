var chai        = require('chai')
  , _           = require('underscore')
  ;

chai.should();

describe( "weighter: gives weights to items according to a specified property", function() {

  var Weighter        = require('./weighter')
    , weighter
    , items
    , itemsOriginal   = [
        { prop: 750 },
        { prop: 250 }
      ]
    , itemsOriginal2  = [
        { prop: 250 },
        { prop: 750 }
      ]
    ;


  beforeEach(function() {
    weighter    = new Weighter({ prop: 'prop' });
    items       = JSON.parse(JSON.stringify(itemsOriginal));
    items2      = JSON.parse(JSON.stringify(itemsOriginal2));
  });


  describe( "calculation", function() {

    it( "should return only one item if there is one item", function() {
      weighter.calculate([items[0]]).length.should.equal(1);
    });

    it( "should add `weight` property to the item", function() {
      var items = [ { aProp: 'something', prop: 100 }];
      weighter.calculate(items)[0].should.have.ownProperty('weight');
    });

    _.times(itemsOriginal.length, function(n) {
      it( "should give 1.0 weight if there is only one item with positive budget - "+ (n+1), function() {
        var results = weighter.calculate([items[n]]);

        results.length.should.equal(1);
        results[0].weight.should.equal(1.0);
      });
    });


    it( "should give correct item weights", function() {
      var result = weighter.calculate(items);

      result.length.should.equal(2);
      result[0].weight.should.equal(0.75);
      result[1].weight.should.equal(0.25);
    });


    it( "should give correct weights to different items", function() {
      var result = weighter.calculate(items2);

      result.length.should.equal(2);
      result[0].weight.should.equal(0.25);
      result[1].weight.should.equal(0.75);
    });

    
    it( "can assign different property name for weight assignments", function() {
      // default property name is: weight
      var weighter  = new Weighter({ prop: 'budget' })
        , items     = [ { budget: 500 } ];

      weighter.calculate(items)[0].should.have.ownProperty('weight');
    });    
    
  });


  describe( "weird cases", function() {

    it( "should return no item if no items supplied", function() {
      weighter.calculate().should.be.an('array');
      weighter.calculate([]).should.be.an('array');
      weighter.calculate([]).length.should.equal(0);
      weighter.calculate().length.should.equal(0);
    });

    it( "has a sum of weights equal to 1.0", function() {
      items.push({ prop: -500 });

      var result      = weighter.calculate(items)
        , totalWeight = result[0].weight +
                        result[1].weight +
                        result[2].weight
        ;

      totalWeight.should.be.equal(1.0);
    });

    it( "should give 0 weight to negative budget items", function() {
      var items = [
        { prop:  50 },
        { prop: -50 }
      ];

      var result = weighter.calculate(items);

      result[0].weight.should.not.below(0.0);
      result[1].weight.should.not.below(0.0);
    });

    it( "should give 0 weight to 0 budget items", function() {
      var items = [ { prop: 0 } ];

      weighter.calculate(items)[0].weight.should.equal(0.0);

      items = [
        { prop: 0 },
        { prop: 0 }
      ];
      weighter.calculate(items)[0].weight.should.equal(0.0);
      weighter.calculate(items)[1].weight.should.equal(0.0);
    });

    it( "should skip null items", function() {
      var items = [
        // only use these items
        { prop: 75                    },
        { prop: 25                    },

        // skip items below
        { prop: undefined,    id: 3   },
        { prop: NaN                   },
        {                             },
        null
      ];

      var result = weighter.calculate(items);
      result.length.should.equal(2);
      result[0].weight.should.equal(0.75);
      result[1].weight.should.equal(0.25);
    });


    it( "should fail without a weight defining property", function() {
      (function() {
        new Weighter()
      }).should.throw(Error);
    });

  });

});
