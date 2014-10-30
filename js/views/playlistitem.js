define([
  'jquery',
  'underscore',
  'backbone',
  'views/playlistdetails',
  'text!templates/playlistitem.html',
], function($, _, Backbone, playlistItemTemplate, PlaylistDetailsView){
  var PlaylistItemView = Backbone.View.extend({
    tagName: 'tr', //prend un tr au lieu d'une div pour cercler le template
    initialize: function(options) {
      _.bindAll(this, 'render');
    },

    events: {
      'click button.delete' : 'removePlaylist',
    },
    
    render: function() {
      var self = this;

      var data = {playlist : this.model.toJSON()}; //call le param model de ce qu'on lui a passé
      var compiledTemplate = _.template( playlistItemTemplate, data );
      this.$el.html( compiledTemplate );

      return this;
    },
    removePlaylist: function() {
      this.model.destroy();
      $(this.el).remove();
    },
    editPlaylist: function() {
      console.log("EDITION playlist : " + "qdsfs");

      var playlistBody = this.$el.find('#playlist-body');

      //
      playlistBody.append(new PlaylistDetailsView({
        model: playlist,
      }).render().el);

    },
  });

  return PlaylistItemView;
});