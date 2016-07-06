
describe('User', function (){
    var User = require('models/user');
    var user;

    before(function(){
        user = new User();
    });

    describe('Attributes', function(){
    	it('should have a firstName', function() {
            user.get('firstName').should.be.a('string');
    	});

    	it('should have a lastName', function() {
            user.get('lastName').should.be.a('string');
        });
    });

    after(function () {
        // Anything after the tests have finished
    });
});