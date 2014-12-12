
define([
  'jquery',
  'underscore',
  'md5',
  'backbone',
  'models/Login',
  'text!templates/menu.html',
  'jquery.cookie'
], function($, _, md5, Backbone, Login, loginTemplate){
  var LoginView = Backbone.View.extend({
    el: $('#menu'),
    initialize: function(options) {
      _.bindAll(this, 'render');

      var self = this;

      this.navigationEventBus = options.navigationEventBus;
      this.navigationEventBus.bind('navigation', this.changeMenu, this);
      this.navigationEventBus.bind('login', this.login, this);
    },
    render: function() {
      var self = this;

      var data = {};
      var compiledTemplate = _.template(loginTemplate, data);

      this.$el.html( compiledTemplate );
      $('#login-menu').show();
      $('#user-menu').hide();

      return this;
    },

    events: {
      'submit form[name="search-form"]': 'search',
      'click #logout-action': 'logout',
    },

    search: function(event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      var self = this;
      var form = $(event.target);

      if (form.find('input[id="search-field"]').val().length >= 1) {
        var request = form.find('input[id="search-field"]').val();
        window.location.hash = "#search/" + request;
      } else {
        $('.top-center').notify({
          message: { text: "Rentrez au moins une lettre pour effectuer une recherche" },
          fadeOut: { enabled: true, delay: 1000 },
          type: 'danger',
        }).show();
      }
    },
    logout: function(event) {
      event.preventDefault();

      $.removeCookie('token');
      $.ajaxSetup({
        headers: { 'Authorization': '' }
      });
      $('#login-menu').show();
      $('#user-menu').hide();

      window.app_router.navigate('#', {trigger: true});

      return false;
    },
    changeMenu: function(page) {
      $('#menu li').removeClass('active');
      $('#menu #'+page).addClass('active');
    },
    login: function(loginModel) {
      $('#login-menu').hide();
      $('#user-menu').show();

      updateMenuWithModel = function(loginModel) {
        $('#user-menu #user-name').html(loginModel.get('name'));
        $('#user-profil-link').attr("href", "#user/"+loginModel.get('id'));
        $('#user-menu .user-picture').attr("src", 'http://www.gravatar.com/avatar/' + md5(loginModel.get('email')) + '?s=25');
      }

      if(loginModel) {
        updateMenuWithModel(loginModel);
      }
      else {
        new Login().fetch({success: function(loginModel) {
          updateMenuWithModel(loginModel);
        }});
      }
    },
  });

  return LoginView;
});
