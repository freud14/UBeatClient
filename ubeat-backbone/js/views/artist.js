// Filename: views/artist
define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!templates/artist.html',
], function($, _, Backbone, artistTemplate){
    var ArtistView = Backbone.View.extend({
        el: $('#page-wrapper'),
        initialize: function() {

            },
        render: function(){
          // Using Underscore we can compile our template with data
          var data = {};
          var compiledTemplate = _.template( artistTemplate, data );
          // Append our compiled template to this Views "el"
          this.$el.html( compiledTemplate );
        }
    });
  // Our module now returns our view
  return ArtistView;
});