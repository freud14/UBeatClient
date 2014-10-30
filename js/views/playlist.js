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
    initialize: function(options) {
      _.bindAll(this, 'render');

      var self = this;

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
    },

    addPlaylist: function(event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      //Pour eviter la soumission double d'un formulaire

      var self = this;
      var form = $(event.target);
      //Attention au nommage du champ , doit correspondre an model
      var newPlaylist = new Playlist({
        name: form.find('input[name="playlist-name"]').val(),
      });

      newPlaylist.save({}, {
        success: function(data) {
          //dans cette fonction interne le this est pas dans le scope d'ou l'utilisation du self
          self.playlistCollection.fetch();
        }
      });
    },
    editPlaylist: function(event) {
      alert($(event.currentTarget).data('url'));
      playlistId = $(event.currentTarget).attr('url');
      console.log("EDITION playlist : " + playlistId);

      var playlistBody = this.$el.find('#playlist-body');

      /*Quand on a l'id => get de la liste de lecture que l'on enverra a la vue details*/

      playlistBody.append(new PlaylistDetailsView({
        model: playlist,
      }).render().el);

    },

  });

  return PlaylistView;
});