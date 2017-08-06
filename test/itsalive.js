var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);

describe('Testing suite capabilites!!!!', function(){
    it('confirms basic arithmetic', function(){
        expect(2+2).to.equal(4);
    });

    it('Testing setTimeout time!!!', function(done){
        var start = new Date();
        setTimeout(function(){
            var duration = new Date() - start;
            
            expect(duration).to.be.closeTo(1000,50);
            done();
        }, 1000);
    });

    // chai.spy(theFunction)
    // chai.spy.on
    it('verifies that forEach invokes a function once for every element', function(){   
        var logger = chai.spy(console.log);

        [1,2,3,4,5].forEach(function(el){
            logger(el);
        });
        expect(logger).to.have.been.called.exactly(5);
    });

});

