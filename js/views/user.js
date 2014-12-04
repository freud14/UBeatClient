
define([
  'jquery',
  'underscore',
  'backbone',
  'models/User',
  'models/TokenInfo',
  'text!templates/user.html',
  'bootstrap-notify'
], function($, _, Backbone, User, TokenInfo, userTemplate){
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

      this.tokenInfoModel = new TokenInfo();
      this.tokenInfoModel.fetch();
    },

    render: function() {
      var self = this;

      var data = {user : this.userModel.toJSON(), playlist : this.playlistCollection.toJSON(), myId : this.tokenInfoModel.toJSON().id};
      var compiledTemplate = _.template( userTemplate, data );

      this.$el.html( compiledTemplate );

      return this;
    },

    events: {
      'click a#follow-button' : 'addFollow',
      'click button.delete' : 'removeFollow',
      'click tr.row-following' : 'viewFollowing'
    },

      //Ne marche pas, utilisé pour follow un user
      addFollow: function(event) {
          event.preventDefault();
          event.stopImmediatePropagation();
          followId = $(event.currentTarget).data('id');
          console.log(followId);
          var followingUser = new User({id : followId});
          this.userModel.save({},{
              type:"POST",
              success: function(data) {
                  $('.top-center').notify({
                      message: { text: 'Follow ajouté avec succès !' },
                      fadeOut: { enabled: true, delay: 1000 }
                  }).show();
              }
          });
      },

      removeFollow: function(event) {
          followId = $(event.currentTarget).data('id');
          this.userModel.destroy({id : followId}
          ).done(function(){
              $('.top-center').notify({
                  message: { text: 'Follow supprimé' },
                  fadeOut: { enabled: true, delay: 1000 },
                  type: 'danger',
              }).show();
              $("#following-"+followId).hide();
          });
      },

      viewFollowing: function(event) {
          followingId = $(event.currentTarget).data('id');
          this.undelegateEvents();
          window.location.hash = "#user/" + followingId;
      },
  });

  return UserView;
});
