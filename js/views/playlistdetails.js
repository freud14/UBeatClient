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
      this.playlistId = id;
      var data = {playlist : this.itemModel};
      var compiledTemplate = _.template( playlistDetailsTemplate, data );
      this.$el.html( compiledTemplate );

      return this;
    },
    removeTrackOnPlaylist: function(event) {
      var trackIdToRemove = $(event.currentTarget).data('id');
      var self = this;
      this.itemModel.destroy({trackId : trackIdToRemove});
      /* Probleme sur le success de destroy => Jamais atteint 
      Aucun JSOn ou text n'est retourné de la pars du serveur */
      this.playlistCollection.fetch().done(function(){
        self.render(self.playlistId);
      });
    },
    editPlaylistName: function(event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      var self = this;
      var form = $(event.target);

      if (form.find('input').val().length >= 2) {
        var newPlaylistName = form.find('input').val();
        this.itemModel.set({name : newPlaylistName});
        this.itemModel.save({}, {
          success: function(data) {
            $('.top-center').notify({
              message: { text: 'Nom de la playlist modifié avec succès !' },
              fadeOut: { enabled: true, delay: 1000 }
            }).show();
          }
        });
      } else {
        $('.top-center').notify({
          message: { text: "Le nom de votre playlist doit contenir au minimum 2 caractères" },
          fadeOut: { enabled: true, delay: 1000 },
          type: 'danger',
        }).show();
      }
    },
  });

  return PlaylistDetailsView;
});