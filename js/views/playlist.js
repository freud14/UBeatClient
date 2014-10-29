define([
  'jquery',
  'underscore',
  'backbone',
  'models/Playlist',
  'models/PlaylistCollection',
  'views/playlistitem',
  'text!templates/playlist.html',
], function($, _, Backbone, Playlist, PlaylistCollection, PlaylistItemView, playlistTemplate){
  var PlaylistView = Backbone.View.extend({
    el: $('#page-wrapper'),
    initialize: function(options) {
      _.bindAll(this, 'render');

      var self = this;

      this.trackEventBus = _.extend({}, Backbone.Events);
      this.trackEventBus.bind("addPlaylist", this.addPlaylist, this);
      this.trackEventBus.bind("removePlaylist", this.removePlaylist, this);
      this.trackEventBus.bind("showPlaylist", this.showPlaylist, this);
      this.trackEventBus.bind("editPlaylist", this.editPlaylist, this);

      this.playlistModel = new Playlist();
      this.playlistModel.bind('change add remove sync', this.render, this);
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

      var playlistTable = this.$el.find('#playlists-table');
      playlistTable.empty();
      this.playlistCollection.each(function(playlist, index, context) {
        playlistTable.append(new PlaylistItemView({
          model: playlist,
          eventBus : self.trackEventBus
        }).render().el);
      });

      return this;
    },

    events: {
      'submit form[name="new-playlist-form"]': 'addPlaylist',
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
          //dans cette fonction interne le this est pas dans le scope
          self.playlistCollection.fetch();
        }
      });
    }
  });

  return PlaylistView;
});