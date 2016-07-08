var chai = require('chai');
var expect = chai.expect;

describe('Class View', function (){
	var ClassView = require('views/class');
	var ClassCollection = require('collections/class');
	var view;

	describe('when constructing without collection', function(){
		it('should throw exception', function () {
			expect(function () {
				new ClassView();
			}).to.throw(/collection is required/);
		});
	});

	describe('when initalized', function () {
		before(function(){
			view = new ClassView({
				collection: new ClassCollection()
			});
		});

		it('should exist', function() {
			view.should.be.defined;
		});
	});

});