var chai = require('chai');
var	sinon = require('sinon');
var should = chai.should();
var expect = chai.expect;
var assert = chai.assert;

describe('Framework', function (){
    before(function(){
        // Stuff to do before the tests, like imports, what not
    });

    describe('Mocha Chia', function(){
    	it('should be present', function() {
    		should.exist(chai);
    	});

    	it('expect should be present', function() {
    		expect(1).to.equal(1);
    	});

    	it('assert should be present', function() {
    		assert.typeOf('foo', 'string');
    	});
    });

    describe('Sinon', function() {
    	it('should be present', function() {
    		should.exist(sinon);
    	});
   	});

    after(function () {
        // Anything after the tests have finished
    });
});