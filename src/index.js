(function () {
  'use strict';

	var Backbone = require('backbone');
	var jQuery = require('jquery');
	var _ = require('underscore');
	Backbone.$ = jQuery;

	var Router = require('./router');
	var router = new Router();

	Backbone.$("body").on("click", ".back-button", function (event) {
	    event.preventDefault();
	    window.history.back();
	});

	Backbone.history.start();

})();