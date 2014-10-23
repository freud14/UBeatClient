// Filename: views/album
define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
  Album = Backbone.Model.extend({
    urlRoot: 'https://ubeat.herokuapp.com/unsecure/albums',

    parse: function(response) {
      return response.results[0];
    },
  });

  return Album;
});
