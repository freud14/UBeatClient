// Filename: views/album
define([
  'jquery',
  'underscore',
  'backbone',
  'models/Album',
  'models/Track',
  'views/track',
  'text!templates/album.html',
], function($, _, Backbone, Album, TrackCollection, TrackView, albumTemplate){
  var AlbumView = Backbone.View.extend({
    el: $('#page-wrapper'),
    initialize: function(options) {
      _.bindAll(this, 'render');

      var self = this;

      this.eventBus = _.extend({}, Backbone.Events);
      this.eventBus.bind("playSong", this.playSong);

      this.albumModel = new Album({id : options.id});
      this.albumModel.bind('change', function() {
      	self.render();
      });

      this.albumModel.fetch();

      this.trackCollection = new TrackCollection({id : options.id});
      this.trackCollection.bind('change add remove sync', function() {
        self.render();
      });

      this.trackCollection.fetch();
    },
    render: function() {
      var self = this;

      var data = {album : this.albumModel.toJSON()};
      data.album.releaseDateString = this.formatDate(data.album.releaseDate);
      var compiledTemplate = _.template( albumTemplate, data );

      this.$el.html( compiledTemplate );

      var trackList = this.$el.find('#track-list');
      trackList.empty();
      this.trackCollection.each(function(track, index, context) {
        trackList.append(new TrackView({model: track, eventBus : self.eventBus}).render().el);
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
      }
      this.currentSong = new Audio(track.previewUrl);
      this.currentSong.play();
    },
  });

  return AlbumView;
});
