
define([
  'jquery',
  'underscore',
  'backbone',
  'config',
], function($, _, Backbone, config) {
  Track = Backbone.Model.extend({
    save: function(attributes, options) {
      if(!options.playlistId)
        throw "You must pass a playlistId field in the options for saving this collection.";
      options = _.defaults((options || {}), {url: config.API_URL + 'playlists/' + options.playlistId + '/tracks'});
      return Backbone.Model.prototype.save.call(this, attributes, options);
    },
  });
  return Track;
});
