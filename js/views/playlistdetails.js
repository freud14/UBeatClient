define([
  'jquery',
  'underscore',
  'backbone',
  'models/Playlist',
  'models/PlaylistCollection',
  'text!templates/playlistdetails.html',
], function($, _, Backbone, Playlist, PlaylistCollection, playlistDetailsTemplate){
  var PlaylistDetailsView = Backbone.View.extend({
    el: $('#page-wrapper'),
    initialize: function(options) {
      _.bindAll(this, 'render');
      this.playlistCollection = new PlaylistCollection();
      this.playlistCollection.fetch();
    },

    events: {
      'click button.delete' : 'removeTrackOnPlaylist',
    },
    
    render: function(id) {
      alert(id);
      itemModel = this.playlistCollection._byId[id];

      console.log(itemModel.attributes.tracks);


      var data = {playlist : itemModel};
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