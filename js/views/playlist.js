define([
  'jquery',
  'underscore',
  'backbone',
  'models/Playlist',
  'models/PlaylistCollection',
  'views/playlistdetails',
  'text!templates/playlist.html',
], function($, _, Backbone, Playlist, PlaylistCollection, PlaylistDetailsView, playlistTemplate){
  var PlaylistView = Backbone.View.extend({
    el: $('#page-wrapper'),
    initialize: function(id) {
      _.bindAll(this, 'render');

      this.playlistModel = new Playlist();
      this.playlistModel.bind('change add destroy sync', this.render, this);
      this.playlistModel.fetch();

      this.playlistCollection = new PlaylistCollection();
      this.playlistCollection.bind('change add remove sync', this.render, this);
      this.playlistCollection.fetch();
    },
    render: function() {
      var self = this;

      var data = {playlist : this.playlistCollection.toJSON()};
      var compiledTemplate = _.template( playlistTemplate, data );
      this.$el.html( compiledTemplate );

      return this;
    },

    events: {
      'submit form[name="new-playlist-form"]': 'addPlaylist',
      'click .edit' : 'editPlaylist',
      'click button.delete' : 'removePlaylist',
    },

    addPlaylist: function(event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      var self = this;
      var form = $(event.target);

      var newPlaylist = new Playlist({
        name: form.find('input[name="playlist-name"]').val(),
      });

      newPlaylist.save({}, {
        success: function(data) {
          $('.top-center').notify({
            message: { text: 'Playlist créée avec succès !' },
            fadeOut: { enabled: true, delay: 1000 }
          }).show();
          self.playlistCollection.fetch();
        }
      });
    },
    editPlaylist: function(event) {
      playlistId = $(event.currentTarget).data('id');
      console.log("EDITION playlist : " + playlistId);
      this.undelegateEvents();
      window.location.hash = "#playlistdetails/" + playlistId;
    },
    removePlaylist: function(event) {
      playlistId = $(event.currentTarget).data('id');
      console.log("SUPPRESSION playlist : " + playlistId);
      playlistToDestroy = this.playlistCollection.get(playlistId);
      playlistToDestroy.destroy({}).done(function(){
        $('.top-center').notify({
          message: { text: 'Playlist supprimé' },
          fadeOut: { enabled: true, delay: 1000 },
          type: 'danger',
        }).show();
      });
    },

  });

  return PlaylistView;
});