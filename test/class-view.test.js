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

		// describe('when view is rendered', function () {
		// 	beforeEach(function () {
		// 		view.render();
		// 	});

		// 	it ('should have new student form', function () {
		// 		console.log(view.$el.find('.new-student'));
		// 	});

			// it ('should website field be empty', function () {
			// 	expect(view.$el.find('input#website')).toHaveValue('');
			// });

			// it ('should feedback field with default feedback', function () {
			// 	expect(view.$el.find('textarea#feedback')).toHaveValue('TDD is awesome..');
			// });

		// });
	});

});