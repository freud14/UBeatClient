// Filename: views/index
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/index.html',
], function($, _, Backbone, indexTemplate){
  var IndexView = Backbone.View.extend({
    el: $('#page-wrapper'),
    initialize: function() {

    },
    render: function(){
      // Using Underscore we can compile our template with data
      var data = {};
      var compiledTemplate = _.template( indexTemplate, data );
      // Append our compiled template to this Views "el"
      this.$el.html( compiledTemplate );
    }
  });
  // Our module now returns our view
  return IndexView;
});
