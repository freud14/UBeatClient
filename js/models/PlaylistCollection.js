
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
      console.log(options);
      this.id = options.id;
    },
    parse: function(response) {
      return response.traks;
    },
/*    fetch: function(options) {
      options = _.defaults((options || {}), {url: config.API_URL + 'albums/' + this.id + '/tracks'});
      return Backbone.Collection.prototype.fetch.call(this, options);
    },*/
  });

  return PlaylistCollection;
});
