
define([
  'jquery',
  'underscore',
  'backbone',
  'config',
], function($, _, Backbone, config) {
  Playlist = Backbone.Model.extend({
    urlRoot: config.API_URL + 'playlists/',

    parse: function(response) {
        return response.traks[0];
    },
  });
  return Playlist;
});
