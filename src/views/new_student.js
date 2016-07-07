(function () {
  'use strict';

	var Backbone = require('backbone');
	var jQuery = require('jquery');
	var _ = require('underscore');
	Backbone.$ = jQuery;

	var template = require('../templates/new_student.hbs');
	var Student = require('../models/student');

	module.exports = Backbone.View.extend({
	  
	  // where content will be rendered.
	  tagName: 'form',
	  className: 'new-student',

	  events: {
	    'submit': 'addStudent'
	  },

	  initialize: function(options){

	  },

	  // add new Student model to collection from inputs, and save
	  addStudent: function(e){
	    // prevent default browser form submission
	    e.preventDefault();

	    var student = new Student(this.formJSON());
	    this.collection.add(student);
	    student.save();
	    this.formClear();
	  },

	  // serialize form inputs and convert to JSON
	  formJSON: function() {
	    var arr = this.$el.serializeArray();
	    return _(arr).reduce(function(acc, field) {
	      acc[field.name] = field.value;
	      return acc;
	    }, {});
	  },

	  // clear user entered data from form
	  formClear: function() {
	    this.$el.trigger('reset');
	    this.formFocus();
	  },

	  // focus the first element of the form
	  formFocus: function() {
	     this.$el.find('input').first().focus();
	  },

	  // render template
	  render: function(){
	    this.$el.html(template());
	    this.formFocus();
	    return this;
	  }

	});

})();