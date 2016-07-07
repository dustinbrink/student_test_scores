(function () {
  'use strict';

  var Backbone = require('backbone');
  var jQuery = require('jquery');
  var _ = require('underscore');
  Backbone.$ = jQuery;

  var Class = require('./collections/class');
  var ClassView = require('./views/class');

  module.exports = Backbone.Router.extend({

    routes: {
  		"": "home",
    },

    home: function () {
      this.loadView(new ClassView({
      	collection: new Class()
      }));
    },

    loadView : function(view) {
  		if(this.view) {
  			this.view.remove();
  		}
  		this.view = view;
  	}

  });

})();