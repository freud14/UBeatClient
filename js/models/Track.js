
define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
  Track = Backbone.Model.extend({
    save: function(options) {
      if(!options.playlistId)
        throw "You must pass a playlistId field in the options for saving this collection.";
      options = _.defaults((options || {}), {url: config.API_URL + 'playlists/' + options.playlistId + '/tracks'});
      return Backbone.Collection.prototype.fetch.create(this, options);
    },
  });
  return Track;
});
