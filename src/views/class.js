(function () {
	'use strict';

	var Backbone = require('backbone');
	var jQuery = require('jquery');
	var _ = require('underscore');
	Backbone.$ = jQuery;

	var Backgrid = require('Backgrid');
	var NewStudentView = require('./new_student');
	var SummaryView = require('./summary');
	var template = require('../templates/class.hbs');

	// Custom Backgrid row to highlight failing grades
	var GradedRow = Backgrid.Row.extend({
		initialize: function() {
			GradedRow.__super__.initialize.apply(this, arguments);
			this.listenTo(this.model, 'change', this.checkGrade); 
			this.checkGrade();
		},

		// toggle highlight if failing grade
		checkGrade: function() {
			this.$el.toggleClass('failing-grade', this.model.failingGrade());
		}
	});


	module.exports = Backbone.View.extend({
		// where content will be rendered.
		el: '#container',

		// local events
		events: {
			'click button.clear': 'clearData'
		},

		// Backgrid columns
		columns: [{
			name: 'firstName',
			label: 'First Name',
			cell: 'string',
			sortType: 'toggle'
		}, {
			name: 'lastName',
			label: 'Last Name',
			cell: 'string',
			sortType: 'toggle'
		}, {
			name: 'testScore',
			label: 'Test Score',
			cell: 'number',
			sortType: 'toggle'
		}],

		initialize: function(options) {
			// require a collection
			if (!this.collection) {
				throw new Error('collection is required');
			}

			// init Backgrid subview
			this.grid = new Backgrid.Grid({
				row: GradedRow,
				columns: this.columns,
				collection: this.collection,
			});

			// init Summary subview
			this.summary = new SummaryView({
				collection: this.collection
			});

			// init creat new student sub view
			this.newStudent = new NewStudentView({
				collection: this.collection
			});

			// Bind collection changes to re-rendering
			this.listenTo(this.collection, 'reset', this.renderAll);

			// inital render
			this.render();

			// fetch collection from remote
			this.collection.fetch({reset: true});
		},

		// delete all current class data
		clearData: function() {
			// destroy on a clone of the collection to prevent out of range errors
			this.collection.chain().clone().each(function(model) {
				model.destroy();
			});
		},

		// render all sub-views
		renderAll: function() {
			this.$el.find('.backgrid_container').html(this.grid.render().el);
			this.$el.find('.new-student').html(this.newStudent.render().el);
			this.$el.find('.summary').html(this.summary.render().el);
		},

		// on render this template
		render: function() {
			this.$el.html(template());
			return this;
		}

	});

})();
