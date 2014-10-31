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
     var self = this;
     this.playlistCollection.fetch().done(function(){
        self.render(options.id);
      });      
    },

    events: {
      'click button.delete' : 'removeTrackOnPlaylist',
    },
    
    render: function(id) {
      itemModel = this.playlistCollection._byId[id];
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