define([
  'jquery',
  'underscore',
  'backbone',
  'models/Search',
  'models/PlaylistCollection',
  'models/Track',
  'models/TrackCollection',
  'views/playlistchoice',
  'text!templates/search.html',
  'text!templates/searchartist.html',
  'text!templates/searchalbum.html',
  'text!templates/searchtrack.html',
  'text!templates/searchuser.html',
], function($, _, Backbone, Search, PlaylistCollection, Track, TrackCollection, PlaylistChoiceView, searchTemplate, searchArtistTemplate, searchAlbumTemplate, searchTrackTemplate, searchUserTemplate) {
  var SearchView = Backbone.View.extend({
    el: $('#page-wrapper'),
    initialize: function(options) {
      _.bindAll(this, 'render');
      var self = this;

      this.playlistChoiceEventBus = _.extend({}, Backbone.Events);
      this.playlistChoiceEventBus.bind("addToPlaylist", this.addToPlaylist, this);

      this.searchModel = new Search();

      this.tokenInfoModel = new TokenInfo();

      this.playlistCollection = new PlaylistCollection();
      this.playlistCollection.fetch().done(function(){
        self.searchModel.fetch(options).done(function(){
          self.tokenInfoModel.fetch().done(function(){
            self.render();
          });
        });
      });

      this.searchQuery = options.request;
      this.searchType = options.searchType;
    },
    render: function() {
      var self = this;
      var data = this.searchModel.toJSON();
      var compiledTemplate = _.template( searchTemplate, data);
      this.$el.html( compiledTemplate );

      this.$el.find('input[id="search-field"]').val(this.searchQuery);
      this.$el.find('#type-search').val(this.searchType);
      var searchResults = this.$el.find('#search-results');

      if (typeof data.results !== 'undefined') {
        searchResults.empty();
        _.each(data.results, function(result) {
          var compiledUserTemplate;
          switch(result.wrapperType) {
            case 'users':
              compiledSearchItemTemplate = _.template(searchUserTemplate, result);
              break;
            case 'artist':
              compiledSearchItemTemplate = _.template(searchArtistTemplate, result);
              break;
            case 'collection':
              compiledSearchItemTemplate = _.template(searchAlbumTemplate, result);
              break;
            case 'track':
              compiledSearchItemTemplate = _.template(searchTrackTemplate, result);
              break;
          }

          var template = $(compiledSearchItemTemplate);
          if (['collection', 'track'].indexOf(result.wrapperType) != -1) {
            template.find('.playlist-choice').html(new PlaylistChoiceView({
              collection: self.playlistCollection,
              model: result,
              eventBus : self.playlistChoiceEventBus,
              tokenInfoModel: self.tokenInfoModel,
            }).render().el);
          }

          searchResults.append(template);
        });
        if(data.results.length == 0) {
          searchResults.text("Il n'y aucun résultat à cette recherche.");
        }
      }
      return this;
    },

    events: {
      'submit form[name="search-form"]': 'search',
    },

    search: function(event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      var self = this;
      var form = $(event.target);

      var searchType = this.$el.find('#type-search option:selected').val();

      if (form.find('input[id="search-field"]').val().length >= 1) {
        var request = form.find('input[id="search-field"]').val();
        if (searchType === "") {
          window.location.hash = "#search/" + encodeURIComponent(request);
        } else {
          window.location.hash = "#search/" + encodeURIComponent(request) + "/" + searchType;
        }
      } else {
        $('.top-center').notify({
          message: { text: "Rentrez au moins une lettre pour effectuer une recherche" },
          fadeOut: { enabled: true, delay: 1000 },
          type: 'danger',
        }).show();
      }
    },
    followUser: function(event) {

    },
    addToPlaylist: function(playlistModel, searchResult) {
      if (searchResult.wrapperType == 'collection') {
        this.addAlbumToPlaylist(playlistModel, searchResult);
      } else if (searchResult.wrapperType == 'track') {
        this.addTrackToPlaylist(playlistModel, searchResult);
      }
    },
    addAlbumToPlaylist: function(playlistModel, searchResult) {
      var trackCollection = new TrackCollection({id : searchResult.collectionId});
      trackCollection.fetch().done(function() {
        playlistModel.set('tracks', playlistModel.get('tracks').concat(trackCollection.toJSON()));

        playlistModel.save().done(function() {
          $('.top-center').notify({
            message: { text: "L'album a été ajouté à la liste de lecture avec succès!" },
            fadeOut: { enabled: true, delay: 1000 }
          }).show();
        }).error(function() {
          $('.top-center').notify({
            message: { text: "Une erreur s'est produite lors de cette opération." },
            fadeOut: { enabled: true, delay: 1000 },
            type: 'danger'
          }).show();
        });
      });
    },
    addTrackToPlaylist: function(playlistModel, searchResult) {
      var track = new Track(searchResult);
      track.save({}, {playlistId : playlistModel.get('id')}).done(function() {
        $('.top-center').notify({
          message: { text: 'La chanson a été ajoutée à la liste de lecture avec succès!' },
          fadeOut: { enabled: true, delay: 1000 }
        }).show();
      }).error(function() {
        $('.top-center').notify({
          message: { text: "Une erreur s'est produite lors de cette opération." },
          fadeOut: { enabled: true, delay: 1000 },
          type: 'danger'
        }).show();
      });
    },
  });

  return SearchView;
});
