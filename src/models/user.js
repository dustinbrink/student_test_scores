var Backbone = require('backbone');
var jQuery = require('jquery');
var _ = require('underscore');
Backbone.$ = jQuery;

module.exports = Backbone.Model.extend({
  defaults: {
  	firstName: "",
  	lastName: ""
  }
});
