
define([
  'jquery',
  'underscore',
  'backbone',
  'config',
], function($, _, Backbone, config) {
  Login = Backbone.Model.extend({
    fetch: function(options) {
      options = _.defaults((options || {}), {url: config.API_URL + 'tokenInfo'});
      return Backbone.Model.prototype.fetch.call(this, options);
    },
    save: function(attributes, options) {
      options = _.defaults((options || {}), {url: config.API_URL + 'login'});
      return Backbone.Model.prototype.save.call(this, attributes, options);
    },

    sync : function(method, model, options) {
      //when sending login information, it is send in the classical query
      //parameter format.
      if (method == "update" || method == "create") {
          options = options ? _.clone(options) : {};
          options['data'] = $.param(this['attributes']);
      }
      var arguments = [method, model, options];
      return Backbone.sync.apply(this, arguments);
    },
  });
  return Login;
});
