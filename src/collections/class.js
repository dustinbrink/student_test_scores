var Backbone = require('backbone');
var jQuery = require('jquery');
var _ = require('underscore');
Backbone.$ = jQuery;

var Student = require('../models/student');

module.exports = Backbone.Collection.extend({
  url: '/test/class.json',
	model: Student,
  comparator: 'testScore',
  //localStorage: new Backbone.LocalStorage("todos-backbone"),
  avgTestScore: function() {
  	var sum = this.reduce(function(total, student) {
  		return total + student.get('testScore');
  	}, 0)
  	return sum / this.size();
  },
  minTestScore: function() {
  	var minSudent = this.min(function(student) {
  		return student.get('testScore');
  	});
  	return minSudent.get('testScore');
  },
  maxTestScore: function() {
  	var maxStudent = this.max(function(student) {
  		return student.get('testScore');
  	});
  	return maxStudent.get('testScore');
  }
});