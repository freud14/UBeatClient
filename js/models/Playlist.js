
define([
  'jquery',
  'underscore',
  'backbone',
  'models/Track',
  'config',
], function($, _, Backbone, Track, config) {
  Playlist = Backbone.Model.extend({
    urlRoot: config.API_URL + 'playlists/',
    deleteTrack: function(trackIdToRemove) {
      console.log(trackIdToRemove);
      var allTracks = this.get('tracks');
      console.log(allTracks);
      //On a toutes les tracks de la playlist il suffit de supprimer 
      //celui dont on à l'id en parametre
    },
  });
  return Playlist;
});
