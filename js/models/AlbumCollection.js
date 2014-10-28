
define([
  'jquery',
  'underscore',
  'backbone',
  'models/Track',
  'config',
], function($, _, Backbone, Track, config){
  AlbumCollection = Backbone.Collection.extend({
    model : Track,
    initialize: function(options) {
      this.id = options.id;
    },
    parse: function(response) {
      return response.results;
    },

    fetch: function(options) {
      options = _.defaults((options || {}), {url: config.API_URL + 'artist/' + this.id + '/albums'});
      return Backbone.Collection.prototype.fetch.call(this, options);
    },
  });

  return AlbumCollection;
});
