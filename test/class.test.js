var _ = require('underscore');

describe('Class Collection', function (){
	var Class = require('collections/class');
	var studentClass;
	var testData = [
			{firstName: 'Andy', lastName: 'Apple', testScore: 75},
			{firstName: 'Bob', lastName: 'Broccoli', testScore: 50},
			{firstName: 'Cristy', lastName: 'Carrot', testScore: 99}
		];

	describe('Contents', function(){
		before(function(){
			studentClass = new Class(testData);
		});

		it('should have correct size', function() {
			studentClass.size().should.be.equal(testData.length);
		});
	});

	describe('avgTestScore', function() {
		before(function(){
			studentClass = new Class(testData);
		});

		it('should be a number', function() {
			studentClass.avgTestScore().should.be.a('number');
		});

		it('should be the correct value', function() {
			var sum = 0;
			_.each(testData, function(data) {
				sum += data.testScore;
			});
			studentClass.avgTestScore().should.equal(sum/testData.length);
		});

		it('should be 0 if collection empty', function() {
			studentClass = new Class();
			studentClass.avgTestScore().should.equal(0);
		});
	});

	describe('minTestScore', function() {
		before(function(){
			studentClass = new Class(testData);
		});

		it('should be a number', function() {
			studentClass.minTestScore().should.be.a('number');
		});

		it('should be the correct value', function() {
			studentClass.minTestScore().should.equal(50);
		});

		it('should be 0 if collection empty', function() {
			studentClass = new Class();
			studentClass.minTestScore().should.equal(0);
		});
	});

	describe('maxTestScore', function() {
		before(function(){
			studentClass = new Class(testData);
		});

		it('should be a number', function() {
			studentClass.maxTestScore().should.be.a('number');
		});

		it('should be the correct value', function() {
			studentClass.maxTestScore().should.equal(99);
		});

		it('should be 0 if collection empty', function() {
			studentClass = new Class();
			studentClass.maxTestScore().should.equal(0);
		});
	});

});