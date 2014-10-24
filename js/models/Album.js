
define([
  'jquery',
  'underscore',
  'backbone',
  'config',
], function($, _, Backbone, config){
  Album = Backbone.Model.extend({
    urlRoot: config.API_URL + 'albums',

    parse: function(response) {
      return response.results[0];
    },
  });

  return Album;
});
