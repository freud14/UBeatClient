
define([
  'jquery',
  'underscore',
  'backbone',
  'models/User',
  'text!templates/user.html',
  'bootstrap-notify'
], function($, _, Backbone, User, userTemplate){
  var UserView = Backbone.View.extend({
    el: $('#page-wrapper'),
    initialize: function(options) {
      _.bindAll(this, 'render');

      var self = this;

      this.userModel = new User({id : options.id});
      this.userModel.fetch({id : options.id}).done(function() {
	      self.render();
      });
      
      this.playlistModel = new Playlist();
      this.playlistModel.bind('change add destroy sync', this.render, this);
      this.playlistModel.fetch();

      this.playlistCollection = new PlaylistCollection();
      this.playlistCollection.bind('change add remove sync', this.render, this);
      this.playlistCollection.fetch();
    },
    render: function() {
      var self = this;

      var data = {user : this.userModel.toJSON(), playlist : this.playlistCollection.toJSON()};
      var compiledTemplate = _.template( userTemplate, data );

      this.$el.html( compiledTemplate );

      return this;
    },
  });

  return UserView;
});
