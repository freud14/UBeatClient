
define([
  'jquery',
  'underscore',
  'backbone',
  'config',
], function($, _, Backbone, config) {
  Playlist = Backbone.Model.extend({
    url: config.API_URL + 'playlists/',
  });
  return Playlist;
});
