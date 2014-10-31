define([
  'jquery',
  'underscore',
  'backbone',
  'views/index',
  'views/album',
  'views/artist',
  'views/login',
  'views/playlist',
  'views/playlistdetails',
  'views/menu',
  'jquery.cookie'
], function($, _, Backbone, IndexView, AlbumView, ArtistView, LoginView, PlaylistView, PlaylistdetailsView, MenuView) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'index',
      'album': 'album',
      'artist': 'artist',
      'login': 'login',
      'playlist': 'playlist',
      'playlistdetails/:id': 'playlistdetails'
    },

    initialize: function(options) {
      this.navigationEventBus = options.navigationEventBus;
    },

    index: function() {
      var indexView = new IndexView();
      indexView.render();
      this.navigationEventBus.trigger('navigation', 'index');
    },
    album: function() {
      var albumView = new AlbumView({id : 579147674});
      albumView.render();
      this.navigationEventBus.trigger('navigation', 'album');
    },
    artist: function() {
      var artistView = new ArtistView();
      artistView.render();
      this.navigationEventBus.trigger('navigation', 'artist');
    },
    playlist: function() {
      var playlistView = new PlaylistView();
      playlistView.render();
      this.navigationEventBus.trigger('navigation', 'playlist');
    },
    playlistdetails: function(id) {
      var playlistdetailsView = new PlaylistdetailsView({id : id});
    },
    login: function() {
      var loginView = new LoginView({
        navigationEventBus : this.navigationEventBus,
      });
      loginView.render();
      this.navigationEventBus.trigger('navigation', 'login');
    },
  });

  var initialize = function() {
    var navigationEventBus = _.extend({}, Backbone.Events);
    var menuView = new MenuView({
      navigationEventBus : navigationEventBus,
    });
    menuView.render();

    window.app_router = new AppRouter({
      navigationEventBus : navigationEventBus,
    });
    var token = $.cookie('token');
    if(token) {
      $.ajaxSetup({
        headers: { "Authorization": token },
      });
      navigationEventBus.trigger('login');
    }

    $.ajaxSetup({
      cache: false,
      statusCode: {
        401: function () {
          navigationEventBus.trigger('logout', {});
          if(Backbone.history.fragment != 'login') {
            window.app_router.navigate('#login', {trigger: true});
          }
        }
      }
    });

    Backbone.history.start({root: '#'});
  };
  return {
    initialize: initialize
  };
});
