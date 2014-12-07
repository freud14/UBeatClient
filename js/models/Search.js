define([
  'jquery',
  'underscore',
  'backbone',
  'config',
], function($, _, Backbone, config) {
  Search = Backbone.Model.extend({
    urlRoot: config.API_URL + 'search',

    fetch: function(options) {
      this.searchType = options.searchType;
      if (typeof options.searchType !== 'undefined') {
        options = _.defaults((options || {}), {url: this.urlRoot + '/' + options.searchType + '?q=' + encodeURIComponent(options.request) });
      } else {
        options = _.defaults((options || {}), {url: this.urlRoot + '?q=' + encodeURIComponent(options.request) });
      }
      return Backbone.Model.prototype.fetch.call(this, options);
    },
    parse: function(data) {
      if (this.searchType == 'users') {
        data = {results : data};
        for (var i = 0; i < data.results.length; ++i) {
          data.results[i].wrapperType = this.searchType;
        }
      }
      return data;
    }
  });
  return Search;
});
