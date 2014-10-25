
define([
  'jquery',
  'underscore',
  'backbone',
  'models/Login',
  'text!templates/login.html',
  'jquery.cookie'
], function($, _, Backbone, Login, loginTemplate){
  var LoginView = Backbone.View.extend({
    el: $('#page-wrapper'),
    initialize: function(options) {
      _.bindAll(this, 'render');

      var self = this;

      this.navigationEventBus = options.navigationEventBus;
    },
    render: function() {
      var self = this;

      var data = {};
      var compiledTemplate = _.template(loginTemplate, data);

      this.$el.html( compiledTemplate );
      this.$el.find('#login-error').hide();

      return this;
    },

    events: {
      'submit form[name="login-form"]': 'login',
    },

    login: function(event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      var self = this;
      var form = $(event.target);
      var login = new Login({
        email: form.find('input[name="email"]').val(),
        password: form.find('input[name="password"]').val(),
      });
      login.save({}, {
        success: function(data) {
          var token = data.get('token');

          $.ajaxSetup({
            headers: { 'Authorization': token }
          });

          var date = new Date();
          var minutes = 60;
          date.setTime(date.getTime() + (minutes * 60 * 1000));
          $.cookie('token', token, { expires: date });

          self.navigationEventBus.trigger('login', data);

          window.app_router.navigate('#', {trigger: true});
        },
        error: function(data) {
          self.$el.find('#login-error').show();
        },
      });
      return false;
    },
  });

  return LoginView;
});
