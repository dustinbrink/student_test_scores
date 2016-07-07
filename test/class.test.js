
describe('Calss Collection', function (){
	var Class = require('collections/class');
	var studentClass;

	describe('Contents', function(){
		var testData = [
			{firstName: 'Andy', lastName: 'Apple', testScore: 75},
			{firstName: 'Bob', lastName: 'Broccoli', testScore: 50},
			{firstName: 'Cristy', lastName: 'Carrot', testScore: 99}
		];

		before(function(){
    	studentClass = new Class(testData);
    });

    it('should have correct size', function() {
    	studentClass.size().should.be.equal(testData.length);
    });
    
  });

});