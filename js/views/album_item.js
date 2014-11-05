// Filename: views/album_item
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/album_item.html'
], function($, _, Backbone, albumItemTemplate){
  var AlbumItemView = Backbone.View.extend({
    initialize: function(options) {
      _.bindAll(this, 'render');

      this.album = options.album;
    },
    render: function(){
      var data = {album : this.album.toJSON()};
      var compiledTemplate = _.template( albumItemTemplate, data );
      this.$el.html( compiledTemplate );

      return this;
    }
  });

  return AlbumItemView;
});
