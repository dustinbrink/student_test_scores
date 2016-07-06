var Backbone = require('backbone');
var jQuery = require('jquery');
var _ = require('underscore');
Backbone.$ = jQuery;

var HomeView = require('./views/home');

module.exports = Backbone.Router.extend({

    routes: {
        "": "home",
    },

    home: function () {
        this.loadView(new HomeView());
    },

    loadView : function(view) {
		if(this.view) {
			this.view.remove();
		}
		this.view = view;
	}

});