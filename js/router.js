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
  'views/search',
  'views/user',
  'jquery.cookie'
], function($, _, Backbone, IndexView, AlbumView, ArtistView, LoginView, PlaylistView, PlaylistdetailsView, MenuView, SearchView,  UserView) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'index',
      'album/:id': 'album',
      'artist/:id': 'artist',
      'login': 'login',
      'playlist': 'playlist',
      'playlistdetails/:id': 'playlistdetails',
      'search/:q/:type': 'search',
      'search/:q': 'search',
      'search': 'search',
      'user/:id': 'user'
    },

    initialize: function(options) {
      this.navigationEventBus = options.navigationEventBus;
    },

    index: function() {
      var indexView = new IndexView();
      indexView.render();
      this.navigationEventBus.trigger('navigation', 'index');
    },
    album: function(id) {
      var albumView = new AlbumView({id : id});
      albumView.render();
      this.navigationEventBus.trigger('navigation', 'album');
    },
    artist: function(id) {
      var artistView = new ArtistView({id : id});
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
      this.navigationEventBus.trigger('navigation', 'playlist');
    },
    login: function() {
      var loginView = new LoginView({
        navigationEventBus : this.navigationEventBus,
      });
      loginView.render();
      this.navigationEventBus.trigger('navigation', 'login');
    },
    search: function(q, type) {
      var searchView;
      if (type) {
        searchView = new SearchView({request : q, searchType : type});
      } else {
        searchView = new SearchView({request : q});
      }
      searchView.render();
      this.navigationEventBus.trigger('navigation', 'search');
    },
    user: function(id) {
      var userView = new UserView({id : id});
      userView.render();
      this.navigationEventBus.trigger('navigation', 'user');
    },
  });

  var initialize = function() {
    // This event bus is used to communicate login and logout status of the
    //user between the router, the login view and the menu view.
    var navigationEventBus = _.extend({}, Backbone.Events);

    var menuView = new MenuView({
      navigationEventBus : navigationEventBus,
    });
    menuView.render();

    window.app_router = new AppRouter({
      navigationEventBus : navigationEventBus,
    });

    //Check of the token cookie if present.
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
          //If we receive a 401 unauthorized and we are not in the login page,
          //we redirect the user to the login page.
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
