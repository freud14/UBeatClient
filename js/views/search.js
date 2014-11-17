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
      'submit form[name="search-form"]': 'search',
    },

    search: function(event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      var self = this;
      var form = $(event.target);

      var selectElmt = document.getElementById("type-search");
      var searchType = selectElmt.options[selectElmt.selectedIndex].value;
      
      if (form.find('input[id="search-field"]').val().length >= 1) {
        var request = form.find('input[id="search-field"]').val();
        if (searchType === "") {
          window.location.hash = "#search/" + request;
        } else {
          window.location.hash = "#search/" + request + "/" + searchType;
        }
      } else {
        $('.top-center').notify({
          message: { text: "Rentrez au moins une lettre pour effectuer une recherche" },
          fadeOut: { enabled: true, delay: 1000 },
          type: 'danger',
        }).show();
      }
    },
    refineSearch: function(event) {
      var request = $("input.#search-field").val();
      var searchType = $(event.currentTarget).data('type');
      console.log(request + "  type :  " + searchType);
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
