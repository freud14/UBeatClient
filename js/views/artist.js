// Filename: views/artist
define([
  'jquery',
  'underscore',
  'backbone',
  'models/Artist',
  'models/AlbumCollection',
  'views/album_item',
  'text!templates/artist.html'
], function($, _, Backbone, Artist, AlbumCollection, AlbumItemView, artistTemplate){
  var ArtistView = Backbone.View.extend({
    el: $('#page-wrapper'),
    initialize: function(options) {
      _.bindAll(this, 'render');

      this.artist = new Artist({id : options.id});
      this.artist.bind('change', this.render, this);
      this.artist.fetch();

      this.albumCollection = new AlbumCollection({id : options.id});
      this.albumCollection.bind('change add remove sync', this.render, this);
      this.albumCollection.fetch();
    },
    render: function(){
      var data = {artist : this.artist.toJSON()};
      var compiledTemplate = _.template( artistTemplate, data );
      this.$el.html( compiledTemplate );

      var albumsList = this.$el.find('#albums-list');
      albumsList.empty();
      this.albumCollection.each(function(album, index, context) {
        albumsList.append(new AlbumItemView({
          album: album,
        }).render().el);
      });

      return this;
    }
  });
  // Our module now returns our view
  return ArtistView;
});
