define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/search.html',
], function($, _, Backbone, searchTemplate){
  var SearchView = Backbone.View.extend({
    el: $('#page-wrapper'),
    initialize: function(id) {
      _.bindAll(this, 'render');

    },
    render: function() {
      var self = this;

      this.$el.html( searchTemplate );

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