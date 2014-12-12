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
      this.currentView = undefined;
    },

    index: function() {
      if(this.currentView) {
        this.currentView.undelegateEvents();
      }

      this.currentView = new IndexView();
      this.currentView.render();
      this.navigationEventBus.trigger('navigation', 'index');
    },
    album: function(id) {
      if(this.currentView) {
        this.currentView.undelegateEvents();
      }

      this.currentView = new AlbumView({id : id});
      this.currentView.render();
      this.navigationEventBus.trigger('navigation', 'album');
    },
    artist: function(id) {
      if(this.currentView) {
        this.currentView.undelegateEvents();
      }

      this.currentView = new ArtistView({id : id});
      this.currentView.render();
      this.navigationEventBus.trigger('navigation', 'artist');
    },
    playlist: function() {
      if(this.currentView) {
        this.currentView.undelegateEvents();
      }

      this.currentView = new PlaylistView();
      this.currentView.render();
      this.navigationEventBus.trigger('navigation', 'playlist');
    },
    playlistdetails: function(id) {
      if(this.currentView) {
        this.currentView.undelegateEvents();
      }

      this.currentView = new PlaylistdetailsView({id : id});
      this.navigationEventBus.trigger('navigation', 'playlist');
    },
    login: function() {
      if(this.currentView) {
        this.currentView.undelegateEvents();
      }

      this.currentView = new LoginView({
        navigationEventBus : this.navigationEventBus,
      });
      this.currentView.render();
      this.navigationEventBus.trigger('navigation', 'login');
    },
    search: function(q, type) {
      if(this.currentView) {
        this.currentView.undelegateEvents();
      }

      if (type) {
        this.currentView = new SearchView({request : q, searchType : type});
      } else {
        this.currentView = new SearchView({request : q});
      }
      this.currentView.render();
      this.navigationEventBus.trigger('navigation', 'search');
    },
    user: function(id) {
      if(this.currentView) {
        this.currentView.undelegateEvents();
      }

      this.currentView = new UserView({id : id});
      this.currentView.render();
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
