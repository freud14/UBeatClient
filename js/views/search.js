define([
  'jquery',
  'underscore',
  'backbone',
  'models/Search',
  'models/PlaylistCollection',
  'views/playlistchoice',
  'text!templates/search.html',
  'text!templates/searchartist.html',
  'text!templates/searchalbum.html',
  'text!templates/searchtrack.html',
  'text!templates/searchuser.html',
], function($, _, Backbone, Search, PlaylistCollection, PlaylistChoiceView, searchTemplate, searchArtistTemplate, searchAlbumTemplate, searchTrackTemplate, searchUserTemplate) {
  var SearchView = Backbone.View.extend({
    el: $('#page-wrapper'),
    initialize: function(options) {
      _.bindAll(this, 'render');
      var self = this;

      this.playlistChoiceEventBus = _.extend({}, Backbone.Events);
      this.playlistChoiceEventBus.bind("addToPlaylist", this.addToPlaylist, this);

      this.searchModel = new Search();

      this.playlistCollection = new PlaylistCollection();
      this.playlistCollection.fetch().done(function(){
        self.searchModel.fetch(options).done(function(){
          self.render();
        });
      });
    },
    render: function() {
      var self = this;
      var data = this.searchModel.toJSON();
      var compiledTemplate = _.template( searchTemplate, data);
      this.$el.html( compiledTemplate );

      var searchResults = this.$el.find('#search-results');
      if (typeof data.results !== 'undefined') {
        searchResults.empty();
        _.each(data.results, function(result) {
          var compiledUserTemplate;
          switch(result.wrapperType) {
            case 'user':
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
            }).render().el);
          }

          searchResults.append(template);
        });
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
    specifiedSearch: function(event) {

    },
    followUser: function(event) {

    },
    addToPlaylist: function(playlistModel, searchResult) {
      playlistId = $(event.currentTarget).data('playlistId');
      playlist = this.playlistCollection.get(playlistId);

      elemType = $(event.currentTarget).data('wrapperType');
      /* => Suivant le type d'element que c'est nous rajoutons l'album ou la track */
    }

  });

  return SearchView;
});
