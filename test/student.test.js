
describe('Student Model', function (){
    var Student = require('models/student');
    var student;

    describe('Default Attributes', function(){
        before(function(){
            student = new Student();
        });

    	it('should have a default firstName', function() {
            student.get('firstName').should.be.a('string');
    	});

    	it('should have a default lastName', function() {
            student.get('lastName').should.be.a('string');
        });

        it('should have a default test score', function() {
            student.get('testScore').should.be.a('number');
        });
    });

    describe('Attributes', function(){
        var testData = {
            firstName: "Dustin",
            lastName: "Brink",
            testScore: 99
        };

        before(function(){
            student = new Student({
                firstName: testData.firstName,
                lastName: testData.lastName,
                testScore: testData.testScore
            });
        });

        it('should have a firstName', function() {
            student.get('firstName').should.be.equal(testData.firstName);
        });

        it('should have a lastName', function() {
            student.get('lastName').should.be.equal(testData.lastName);
        });

        it('should have a test score', function() {
            student.get('testScore').should.be.equal(testData.testScore);
        });
    });

});