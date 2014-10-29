define([
  'jquery',
  'underscore',
  'backbone',
  'models/Playlist',
  'text!templates/playlistdetails.html',
], function($, _, Backbone, Playlist, playlistDetailsTemplate){
  var PlaylistDetailsView = Backbone.View.extend({
    initialize: function(options) {
      _.bindAll(this, 'render');
    },

    events: {
      'click button.delete' : 'removeTrackOnPlaylist',
    },
    
    render: function() {
      var self = this;

      var data = {playlist : this.model.toJSON()};
      var compiledTemplate = _.template( playlistDetailsTemplate, data );
      this.$el.html( compiledTemplate );

      return this;
    },
    removeTrackOnPlaylist: function() {
      //TODO
    },
    editPlaylistName: function() {
      //TODO
    },
  });

  return PlaylistDetailsView;
});