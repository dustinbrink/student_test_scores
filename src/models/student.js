var Backbone = require('backbone');
var jQuery = require('jquery');
var _ = require('underscore');
Backbone.$ = jQuery;

module.exports = Backbone.Model.extend({
	urlRoot: '/student',
  defaults: {
  	firstName: "",
  	lastName: "",
  	testScore: 0
  },
  validate: function(attributes){
  	if(attributes.testScore < 0 && attributes.testScore > 100) {
  		return "Test Score is out of range, please enter a number between 0 - 100";
  	}
  	return true;
  },
  initialize: function (data) {
    // ensure testScore really is a number, for avgerage calc
    this.set('testScore', parseFloat(this.get('testScore')) || this.defaults.testScore);
  },
  failingGrade: function() {
    return this.get('testScore') < 65;
  }
});
