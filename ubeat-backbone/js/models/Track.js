// Filename: views/album
define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
  Track = Backbone.Model.extend({
  });

  TrackCollection = Backbone.Collection.extend({
    model : Track,
    initialize: function(options) {
      this.id = options.id;
    },
    url: function() {
      return 'https://ubeat.herokuapp.com/unsecure/albums/' + this.id + '/tracks';
    },
    parse: function(response) {
      return response.results;
    }
  });

  return TrackCollection;
});
