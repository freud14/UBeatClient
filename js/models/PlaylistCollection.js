
define([
  'jquery',
  'underscore',
  'backbone',
  'models/Playlist',
  'config',
], function($, _, Backbone, Playlist, config){
  PlaylistCollection = Backbone.Collection.extend({
    url: config.API_URL + 'playlists/',
    model : Playlist,

    initialize: function(options) {
      
    },
    parse: function(response) {
      return response.traks;
    },

    fetch: function(options) {
      options = _.defaults((options || {}), {url: config.API_URL + 'unsecure/playlists/'});
      return Backbone.Collection.prototype.fetch.call(this, options);
    },
  });

  return PlaylistCollection;
});
