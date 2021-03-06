
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/playlistchoice.html',
], function($, _, Backbone, playlistchoiceTemplate) {
  var PlaylistChoiceView = Backbone.View.extend({
    initialize: function(options) {
      _.bindAll(this, 'render');

      var self = this;

      this.eventBus = options.eventBus;
      this.tokenInfoModel = options.tokenInfoModel;
    },
    render: function() {
      var data = {playlists : this.collection.toJSON(), userId : this.tokenInfoModel.toJSON().id};
      var compiledTemplate = _.template( playlistchoiceTemplate, data );

      this.$el.html( compiledTemplate );
      return this;
    },

    events: {
      "change .playlists": "playlistChoice",
    },

    playlistChoice: function(event) {
      this.eventBus.trigger('addToPlaylist', this.collection.get($(event.target).val()), this.model);
      this.$el.find('.playlists option[value=""]').attr('selected', 'selected');
    },
  });

  return PlaylistChoiceView;
});
