define([
  'jquery',
  'underscore',
  'backbone',
  'models/Search',
  'text!templates/search.html',
], function($, _, Backbone, Search, searchTemplate){
  var SearchView = Backbone.View.extend({
    el: $('#page-wrapper'),
    initialize: function(options) {
      _.bindAll(this, 'render');
      var self = this;
      this.searchModel = new Search();
      this.searchModel.fetch(options).done(function(){
        self.render();
      });
    },
    render: function() {
      var data = this.searchModel.toJSON();
      var compiledTemplate = _.template( searchTemplate, data);
      this.$el.html( compiledTemplate );
      return this;
    },

    events: {

    },


    search: function(event) {

    },
    specifiedSearch: function(event) {

    },
    followUser: function(event) {

    },
    addToPlaylist: function(event) {
      playlistId = $(event.currentTarget).data('playlistId');
      playlist = this.playlistCollection.get(playlistId);

      elemType = $(event.currentTarget).data('wrapperType');
      /* => Suivant le type d'element que c'est nous rajoutons l'album ou la track */
    }

  });

  return SearchView;
});
