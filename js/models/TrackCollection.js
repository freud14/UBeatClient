
define([
  'jquery',
  'underscore',
  'backbone',
  'models/Track',
  'config',
], function($, _, Backbone, Track, config){
  TrackCollection = Backbone.Collection.extend({
    model : Track,
    initialize: function(options) {
      this.id = options.id;
    },
    parse: function(response) {
      return response.results;
    },

    fetch: function(options) {
      options = _.defaults((options || {}), {url: config.API_URL + 'albums/' + this.id + '/tracks'});
      return Backbone.Collection.prototype.fetch.call(this, options);
    },
  });

  return TrackCollection;
});
