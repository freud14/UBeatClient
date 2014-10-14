// Filename: views/index
define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
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