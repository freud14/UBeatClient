define([
  'jquery',
  'underscore',
  'backbone',
  'config',
], function($, _, Backbone, config) {
  TokenInfo = Backbone.Model.extend({
    urlRoot: config.API_URL + 'tokeninfo',
    
    fetch: function(options){
	    options = _.defaults((options || {}), {url: config.API_URL + 'tokeninfo'});
      return Backbone.Model.prototype.fetch.call(this, options);
    }
    
  });
  return TokenInfo;
});