define([
  'jquery',
  'underscore',
  'backbone',
  'config',
], function($, _, Backbone, config) {
  Search = Backbone.Model.extend({
    urlRoot: config.API_URL + 'search',

    fetch: function(options) {
      if(options.searchType){
        options = _.defaults((options || {}), {url: this.urlRoot + '/' + options.searchType + '?q=' + encodeURIComponent(options.request) });
      } else {
        options = _.defaults((options || {}), {url: this.urlRoot + '?q=' + encodeURIComponent(options.request) });
      }
      return Backbone.Model.prototype.fetch.call(this, options);
    },
  });
  return Search;
});
