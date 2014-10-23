// Filename: views/track
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/track.html',
], function($, _, Backbone, trackTemplate){
  var TrackView = Backbone.View.extend({
    tagName: 'tr',
    initialize: function(options) {
      _.bindAll(this, 'render');

      var self = this;

      this.eventBus = options.eventBus;
    },
    render: function() {

      var data = {track: this.model.toJSON()};
      data.track.trackTimeString = this.formatTime(data.track.trackTimeMillis / 1000);
      var compiledTemplate = _.template( trackTemplate, data );

      this.$el.html( compiledTemplate );
      return this;
    },
    formatTime: function(seconds) {
      var hh = Math.floor(seconds / 3600),
        mm = Math.floor(seconds / 60) % 60,
        ss = Math.floor(seconds) % 60;
      return (hh ? (hh < 10 ? "0" : "") + hh + ":" : "") + ((mm < 10) && hh ? "0" : "") + mm + ":" + (ss < 10 ? "0" : "") + ss
    },

    events: {
      "click .fa-play": "play"
    },

    play: function() {
      console.log(this.model.toJSON());
      this.eventBus.trigger("playSong", this.model.toJSON());
    },
  });

  return TrackView;
});
