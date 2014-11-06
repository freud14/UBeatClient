
define([
  'jquery',
  'underscore',
  'backbone',
  'models/Album',
  'models/TrackCollection',
  'models/PlaylistCollection',
  'views/albumtrack',
  'views/playlistchoice',
  'text!templates/album.html',
  'bootstrap-notify'
], function($, _, Backbone, Album, TrackCollection, PlaylistCollection, AlbumTrackView, PlaylistChoiceView, albumTemplate){
  var AlbumView = Backbone.View.extend({
    el: $('#page-wrapper'),
    initialize: function(options) {
      _.bindAll(this, 'render');

      var self = this;

      this.trackEventBus = _.extend({}, Backbone.Events);
      this.trackEventBus.bind("playSong", this.playSong, this);
      this.trackEventBus.bind("stopSong", this.stopSong, this);
      this.trackEventBus.bind("addToPlaylist", this.addTrackToPlaylist, this);

      this.playlistChoiceEventBus = _.extend({}, Backbone.Events);
      this.playlistChoiceEventBus.bind("addToPlaylist", this.addAlbumToPlaylist, this);

      this.albumModel = new Album({id : options.id});
      this.albumModel.bind('change', this.render, this);
      this.albumModel.fetch();

      this.trackCollection = new TrackCollection({id : options.id});
      this.trackCollection.bind('change add remove sync', this.render, this);
      this.trackCollection.fetch();

      this.playlistCollection = new PlaylistCollection();
      this.playlistCollection.bind('change add remove sync', this.render, this);
      this.playlistCollection.fetch();
    },
    render: function() {
      var self = this;

      var data = {album : this.albumModel.toJSON()};
      data.album.releaseDateString = this.formatDate(data.album.releaseDate);
      var compiledTemplate = _.template( albumTemplate, data );

      this.$el.html( compiledTemplate );

      this.$el.find('.album-playlistchoice').html(new PlaylistChoiceView({
        collection: this.playlistCollection,
        eventBus : this.playlistChoiceEventBus,
      }).render().el);

      var trackList = this.$el.find('#track-list');
      trackList.empty();
      this.trackCollection.each(function(track, index, context) {
        trackList.append(new AlbumTrackView({
          model: track,
          playlistCollection: self.playlistCollection,
          eventBus : self.trackEventBus
        }).render().el);
      });

      return this;
    },
    formatDate: function(date) {
      var m_names = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

      var d = new Date(date);
      var curr_date = d.getDate();
      var curr_month = d.getMonth();
      var curr_year = d.getFullYear();
      return curr_date + " " + m_names[curr_month] + " " + curr_year;
    },

    playSong: function(track) {
      if(this.currentSong) {
        this.currentSong.pause();
        this.trackEventBus.trigger('songChanged');
      }
      this.currentSong = new Audio(track.previewUrl);
      this.currentSong.play();
    },
    stopSong: function(track) {
      if(this.currentSong) {
        this.currentSong.pause();
      }
    },

    addTrackToPlaylist: function(playlist, track) {
      track.save({}, {playlistId : playlist.get('id')}).done(function() {
        $('.top-right').notify({
          message: { text: 'La chanson a été ajoutée à la liste de lecture avec succès!' },
          fadeOut: { enabled: true, delay: 5000 }
        }).show();
      });
    },
    addAlbumToPlaylist: function(playlist, test) {
      playlist.set('tracks', playlist.get('tracks').concat(this.trackCollection.toJSON()));
      playlist.save().done(function() {
        $('.top-right').notify({
          message: { text: "L'album a été ajouté à la liste de lecture avec succès!" },
          fadeOut: { enabled: true, delay: 5000 }
        }).show();
      });
    },
  });

  return AlbumView;
});
