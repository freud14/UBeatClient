
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
  });

  return PlaylistCollection;
});
