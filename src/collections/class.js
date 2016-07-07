(function () {
	'use strict';

	var Backbone = require('backbone');
	var jQuery = require('jquery');
	var _ = require('underscore');
	Backbone.$ = jQuery;
	Backbone.LocalStorage = require("backbone.localstorage");

	var Student = require('../models/student');

	module.exports = Backbone.Collection.extend({
		url: '/test/data/class.json',
		model: Student,
		comparator: 'testScore',
		localStorage: new Backbone.LocalStorage("Class"),

		// return average test score of all students
		avgTestScore: function() {
			var sum = this.reduce(function(total, student) {
				return total + student.get('testScore');
			}, 0);
			return this.size() ? sum / this.size() : 0;
		},

		// return minimum test score from all students
		minTestScore: function() {
			var minStudent = this.min(function(student) {
				return student.get('testScore');
			});
			return this.size() ? minStudent.get('testScore') : 0;
		},

		// return maximum test score from all students 
		maxTestScore: function() {
			var maxStudent = this.max(function(student) {
				return student.get('testScore');
			});
			return this.size() ? maxStudent.get('testScore') : 0;
		}
	});

})();