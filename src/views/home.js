var Backbone = require('backbone');
var jQuery = require('jquery');
var _ = require('underscore');
Backbone.$ = jQuery;

module.exports = Backbone.View.extend({
  
  // where content will be rendered.
  el: '#container',

  initialize: function(){
    this.render();
  },

  // on render update el with new text, showing it's loaded
  render: function(){
    this.$el.html("Hello World");
    return this;
  }

});
