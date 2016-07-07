var Backbone = require('backbone');
var jQuery = require('jquery');
var _ = require('underscore');
Backbone.$ = jQuery;

module.exports = Backbone.Model.extend({
	urlRoot: '/student',
  
  // model defaults values
  defaults: {
  	firstName: "",
  	lastName: "",
  	testScore: 0
  },

  initialize: function (data) {
    // ensure testScore really is a number, for avgerage calc
    this.set('testScore', parseFloat(this.get('testScore')) || this.defaults.testScore);
    
    // save model on any model change
    this.listenTo(this, 'change', function (model, options) {
      if (options && options.save === false) return;
        model.save();
    });
  },

  // Boolean check if test score is below failing score
  failingGrade: function() {
    return this.get('testScore') < 65;
  }
});
