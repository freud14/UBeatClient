
define([
  'jquery',
  'underscore',
  'backbone',
  'wavesurfer',
  'models/Album',
  'models/TrackCollection',
  'models/PlaylistCollection',
  'views/albumtrack',
  'views/playlistchoice',
  'text!templates/album.html',
  'bootstrap-notify'
], function($, _, Backbone, WaveSurferLibrary, Album, TrackCollection, PlaylistCollection, AlbumTrackView, PlaylistChoiceView, albumTemplate){
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

      this.tokenInfoModel = new TokenInfo();
      this.tokenInfoModel.fetch();
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
        tokenInfoModel : this.tokenInfoModel,
      }).render().el);

      var trackList = this.$el.find('#track-list');
      trackList.empty();
      this.trackCollection.each(function(track, index, context) {
        trackList.append(new AlbumTrackView({
          model: track,
          playlistCollection: self.playlistCollection,
          eventBus : self.trackEventBus,
          tokenInfoModel : self.tokenInfoModel,
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
    stopSong: function(track) {
      var self = this;
      if(this.currentSong) {
        this.currentSong.pause();
      }

      self.currentSong.destroy();
      self.currentSong = undefined;
      this.$el.find('#track-list #wave').remove();
    },

    playSong: function(track) {
      var self = this;
      if(this.currentSong) {
        this.stopSong(track);
        this.trackEventBus.trigger('songChanged');
      }

      var originalTrack = this.trackCollection.find(function(model) { return model.get('trackId') == track.trackId; });
      var trackIndex = this.trackCollection.indexOf(originalTrack);
      var trackSelected = this.$el.find('#track-list tr:eq(' + trackIndex + ')');
      trackSelected.after('<tr colspan="3" id="wave"></tr>');

      this.currentSong = Object.create(WaveSurfer);
      this.currentSong.init({
        container: '#wave',
        waveColor: 'violet',
        progressColor: 'purple',
        fillParent: true,
        interact: false
      });
      this.currentSong.on('ready', function () {
        self.currentSong.play();
      });
      this.currentSong.on('finish', function () {
        this.stopSong(track);
        self.trackEventBus.trigger('songChanged');
      });
      this.currentSong.load(track.previewUrl);
    },

    addTrackToPlaylist: function(playlist, track) {
      track.save({}, {playlistId : playlist.get('id')}).done(function() {
        $('.top-center').notify({
          message: { text: 'La chanson a été ajoutée à la liste de lecture avec succès!' },
          fadeOut: { enabled: true, delay: 1000 }
        }).show();
      }).error(function() {
        $('.top-center').notify({
          message: { text: "Une erreur s'est produite lors de cette opération." },
          fadeOut: { enabled: true, delay: 1000 },
          type: 'danger'
        }).show();
      });
    },
    addAlbumToPlaylist: function(playlist) {
      playlist.set('tracks', playlist.get('tracks').concat(this.trackCollection.toJSON()));

      playlist.save().done(function() {
        $('.top-center').notify({
          message: { text: "L'album a été ajouté à la liste de lecture avec succès!" },
          fadeOut: { enabled: true, delay: 1000 }
        }).show();
      }).error(function() {
        $('.top-center').notify({
          message: { text: "Une erreur s'est produite lors de cette opération." },
          fadeOut: { enabled: true, delay: 1000 },
          type: 'danger'
        }).show();
      });
    },
  });

  return AlbumView;
});
