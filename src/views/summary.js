(function () {
	'use strict';

	var Backbone = require('backbone');
	var jQuery = require('jquery');
	var _ = require('underscore');
	Backbone.$ = jQuery;

	var template = require('../templates/summary.hbs');

	module.exports = Backbone.View.extend({
		
		// where content will be rendered
		tagName: 'ul',

		events: {
		},

		initialize: function(options){
			this.listenTo(this.collection, 'change remove', this.render);
		},

		// render template
		render: function(){
			this.$el.html(template({
				avg: this.collection.avgTestScore().toFixed(2),
				min: this.collection.minTestScore(),
				max: this.collection.maxTestScore()
			}));

			return this;
		}

	});

})();