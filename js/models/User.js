define([
  'jquery',
  'underscore',
  'backbone',
  'config',
], function($, _, Backbone, config) {
  User = Backbone.Model.extend({
    urlRoot: config.API_URL + 'users',
    
    fetch: function(options){
	    options = _.defaults((options || {}), {url: config.API_URL + 'users/' + options.id});
      return Backbone.Model.prototype.fetch.call(this, options);
    }
    
  });
  return User;
});