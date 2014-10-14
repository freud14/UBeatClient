define([
    'jquery',
    'underscore',
    'backbone',
    'views/index',
		'views/album',
		'views/artist'
], function($, _, Backbone, IndexView, AlbumView, ArtistView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'index',
						'album': 'album',
						'artist': 'artist'
        },
        index: function() {
            var indexView = new IndexView();
            indexView.render();

        },
        album: function() {
            var albumView = new AlbumView();
            albumView.render();
        },
        artist: function() {
            var artistView = new ArtistView();
            artistView.render();
        }
    });

    var initialize = function() {
        var app_router = new AppRouter;
        Backbone.history.start({root: '#'});
        app_router.navigate('#', {trigger: true});
    };
    return {
        initialize: initialize
    };
});		


