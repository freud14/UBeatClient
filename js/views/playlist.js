define([
  'jquery',
  'underscore',
  'backbone',
  'models/Playlist',
  'models/PlaylistCollection',
  'text!templates/playlist.html',
], function($, _, Backbone, Playlist, PlaylistCollection, playlistTemplate){
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
    },
    render: function() {
      var self = this;

      var data = {album : this.playlistModel.toJSON()};
      var compiledTemplate = _.template( playlistTemplate, data );
      this.$el.html( compiledTemplate );

      /*this.$el.find('.album-playlistchoice').html(new PlaylistChoiceView({
        collection: this.playlistCollection,
        eventBus : this.playlistChoiceEventBus,
      }).render().el);

      var trackList = this.$el.find('#track-list');
      trackList.empty();
      this.trackCollection.each(function(track, index, context) {
        trackList.append(new TrackView({
          model: track,
          playlistCollection: self.playlistCollection,
          eventBus : self.trackEventBus
        }).render().el);
      });*/

      return this;
    },
    addPlaylist: function(playlist) {
      //playlist.save();
    },
    removePlaylist: function(playlist) {
      //playlist.save();
    },
    showPlaylist: function(playlist) {
      //playlist.save();
    },
    editPlaylist: function(playlist) {
      //playlist.save();
    },
   /* addAlbumToPlaylist: function(playlist, test) {
      playlist.set('tracks', playlist.get('tracks').concat(this.trackCollection.toJSON()));
      playlist.save();
    },*/
  });

  return PlaylistView;
});