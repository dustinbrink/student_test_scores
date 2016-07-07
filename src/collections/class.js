var Backbone = require('backbone');
var jQuery = require('jquery');
var _ = require('underscore');
Backbone.$ = jQuery;
Backbone.LocalStorage = require("backbone.localstorage");

var Student = require('../models/student');

module.exports = Backbone.Collection.extend({
  url: '/test/class.json',
	model: Student,
  comparator: 'testScore',
  localStorage: new Backbone.LocalStorage("Class"),
  avgTestScore: function() {
  	var sum = this.reduce(function(total, student) {
  		return total + student.get('testScore');
  	}, 0)
  	return sum / this.size();
  },
  minTestScore: function() {
  	var minStudent = this.min(function(student) {
  		return student.get('testScore');
  	});
  	return this.size() ? minStudent.get('testScore') : 0;
  },
  maxTestScore: function() {
  	var maxStudent = this.max(function(student) {
  		return student.get('testScore');
  	});
  	return this.size() ? maxStudent.get('testScore') : 0;
  }
});