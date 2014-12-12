
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

      var data = {user : this.userModel.toJSON(), playlist : this.playlistCollection.toJSON(), userConnected : this.tokenInfoModel.toJSON()};
      var compiledTemplate = _.template( userTemplate, data );

      this.$el.html( compiledTemplate );

      return this;
    },

    events: {
      'click #follow-button' : 'addFollow',
      'click #unfollow-button' : 'removeFollowButton',
      'click tr.row-following' : 'viewFollowing',
      'click button.delete' : 'removeFollow',
      'click .edit' : 'editPlaylist',
      'click .delete-playlist' : 'removePlaylist'
    },

    addFollow: function(event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      followId = $(event.currentTarget).data('id');
      var followingUser = new User({id : followId});
      this.userModel.save({},{
        type:"POST",
        success: function(data) {
          $('.top-center').notify({
            message: { text: 'Follow ajouté avec succès !' },
            fadeOut: { enabled: true, delay: 1000 }
          }).show();
          $("#to-follow").remove();
          $("#info-user").after("<div id='to-unfollow'>"+
            "<button type='button' class='btn btn-danger' id='unfollow-button' data-id='"+followId+"'>Unfollow</button>"+
            "</div>");
        }
      });
    },
    removeFollow: function(event) {
      event.preventDefault();
      event.stopImmediatePropagation();
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
    removeFollowButton: function(event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      followId = $(event.currentTarget).data('id');
      this.userModel.destroy({id : followId}
      ).done(function(){
        $('.top-center').notify({
            message: { text: 'Follow supprimé' },
            fadeOut: { enabled: true, delay: 1000 },
            type: 'danger',
        }).show();
        $("#to-unfollow").remove();
        $("#info-user").after("<div id='to-follow'>"+
          "<button type='button' class='btn btn-primary' id='follow-button' data-id='"+followId+"'>Follow</button>"+
          "</div>");
      });
    },
    viewFollowing: function(event) {
      followingId = $(event.currentTarget).data('id');
      this.undelegateEvents();
      window.location.hash = "#user/" + followingId;
    },
    editPlaylist: function(event) {
      playlistId = $(event.currentTarget).data('id');
      this.undelegateEvents();
      window.location.hash = "#playlistdetails/" + playlistId;
    },
    removePlaylist: function(event) {
      playlistId = $(event.currentTarget).data('id');
      playlistToDestroy = this.playlistCollection.get(playlistId);
      playlistToDestroy.destroy({}).done(function(){
        $('.top-center').notify({
          message: { text: 'Playlist supprimé' },
          fadeOut: { enabled: true, delay: 1000 },
          type: 'danger',
        }).show();
      });
    }
  });

  return UserView;
});
