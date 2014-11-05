
define([
  'jquery',
  'underscore',
  'backbone',
  'config',
], function($, _, Backbone, config){
  Album = Backbone.Model.extend({
    urlRoot: config.API_URL + 'albums',

    parse: function(response) {
      if('results' in response) { //We got the data from the API, select the result array
        return response.results[0];
      }
      else { //We got the data from the collection, already correctly parsed
        return response;
      }
    },
  });

  return Album;
});
