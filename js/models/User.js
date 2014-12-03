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
    },

    //Ne marche pas, utilisé pour follow un user
    save: function(attributes, options) {
      options = _.defaults((options || {}), {url: config.API_URL + 'follow'});
      return Backbone.Model.prototype.save.call(this, attributes, options);
    },

    destroy: function(options) {
      if(options.id){
          options = _.defaults((options || {}), {url: config.API_URL + 'follow/' + options.id });
      }
      return Backbone.Model.prototype.destroy.call(this, options);
    },
    
  });
  return User;
});