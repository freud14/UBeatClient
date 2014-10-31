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
      'click button.delete-track' : 'removeTrackOnPlaylist',
      'submit form[name="change-playlist-name-form"]': 'editPlaylistName',
    },
    
    render: function(id) {
      this.itemModel = this.playlistCollection._byId[id];
      var data = {playlist : this.itemModel};
      var compiledTemplate = _.template( playlistDetailsTemplate, data );
      this.$el.html( compiledTemplate );

      return this;
    },
    removeTrackOnPlaylist: function(event) {
      var trackId = $(event.currentTarget).data('id');
      console.log(trackId);
    },
    editPlaylistName: function(event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      var self = this;
      var form = $(event.target);

      var newPlaylistName = form.find('input').val();
      this.itemModel.set({name : newPlaylistName});
      this.itemModel.save();
    },
  });

  return PlaylistDetailsView;
});