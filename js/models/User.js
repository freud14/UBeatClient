define([
  'jquery',
  'underscore',
  'backbone',
  'config',
], function($, _, Backbone, config) {
  User = Backbone.Model.extend({
    urlRoot: config.API_URL + 'users/',
  });
  return User;
});