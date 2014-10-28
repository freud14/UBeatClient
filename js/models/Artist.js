
define([
  'jquery',
  'underscore',
  'backbone',
  'config',
], function($, _, Backbone, config){
  Artist = Backbone.Model.extend({
    urlRoot: config.API_URL + 'artists',

    parse: function(response) {
      return response.results[0];
    },
  });

  return Artist;
});
