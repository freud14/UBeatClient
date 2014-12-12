// Filename: views/track
define([
  'jquery',
  'underscore',
  'backbone',
  'views/playlistchoice',
  'text!templates/albumtrack.html',
], function($, _, Backbone, PlaylistChoiceView, trackTemplate) {
  var AlbumTrackView = Backbone.View.extend({
    tagName: 'tr',
    initialize: function(options) {
      _.bindAll(this, 'render');

      var self = this;

      this.playlistCollection = options.playlistCollection;

      this.eventBus = options.eventBus;
      this.tokenInfoModel = options.tokenInfoModel;

      this.eventBus.bind("songChanged", this.songChanged, this);
    },
    render: function() {
      var data = {track: this.model.toJSON()};
      data.track.trackTimeString = this.formatTime(data.track.trackTimeMillis / 1000);
      var compiledTemplate = _.template( trackTemplate, data );

      this.$el.html( compiledTemplate );
      this.$el.find('.play').show();
      this.$el.find('.stop').hide();

      this.$el.find('.playlistchoice-column').html(new PlaylistChoiceView({
        collection: this.playlistCollection,
        model: this.model,
        eventBus : this.eventBus,
        tokenInfoModel : this.tokenInfoModel,
      }).render().el);

      return this;
    },
    formatTime: function(seconds) {
      var hh = Math.floor(seconds / 3600),
        mm = Math.floor(seconds / 60) % 60,
        ss = Math.floor(seconds) % 60;
      return (hh ? (hh < 10 ? "0" : "") + hh + ":" : "") + ((mm < 10) && hh ? "0" : "") + mm + ":" + (ss < 10 ? "0" : "") + ss
    },

    events: {
      "click .play": "play",
      "click .stop": "stop",
    },
    
    play: function() {
      this.eventBus.trigger("playSong", this.model.toJSON());
      this.$el.find('.play').hide();
      this.$el.find('.stop').show();
    },
    stop: function() {
      this.eventBus.trigger("stopSong", this.model.toJSON());
      this.$el.find('.play').show();
      this.$el.find('.stop').hide();
    },
    songChanged: function() {
      this.$el.find('.play').show();
      this.$el.find('.stop').hide();
    },
  });

  return AlbumTrackView;
});
