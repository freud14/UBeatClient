
define([
  'jquery',
  'underscore',
  'backbone',
  'models/Track',
  'config',
], function($, _, Backbone, Track, config) {
  Playlist = Backbone.Model.extend({
    urlRoot: config.API_URL + 'playlists/',

    destroy: function(options) {
      if(options.trackId){
        options = _.defaults((options || {}), {url: config.API_URL + '/playlists/' + this.id + '/tracks/' + options.trackId});
        console.log(options);
      }
      return Backbone.Model.prototype.destroy.call(this, options);
    },
  });
  return Playlist;
});
