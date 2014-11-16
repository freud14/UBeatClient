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
    albumSearch: function(event) {

    },
    userSearch: function(event) {

    },
    artistSearch: function(event) {

    },
    trackSearch: function(event) {

    },

  });

  return SearchView;
});
