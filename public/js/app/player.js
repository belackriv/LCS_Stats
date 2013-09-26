
define([
   "jquery",
    "backbone",
//    "backbone.wreqr",
//    "backbone.babysitter",
//    "backbone-forms",
    "marionette",
    "app/app"
  ], function($, Backbone, Marionette,app){

  var Player = Backbone.Model.extend({
    defaults:{
      name:'Player Name',
      nick: 'Player Nick',
      votes: 0,
      voteScore: 0,
      rank: 0,
      position:'Player Position',
      picPath:'/img/players/blank_profile_pic.jpg',
      info:'Player Info',
      currentTeam:'Player\'s Team',
      positionIndex: 0
    },
    schema: {
      name: { title: 'Player Name', type:'Text' },
      nick: { title: 'Player Nick', type: 'Text' },
      position: { title: 'Player Position', type: 'Select', options: [
        'Top', 'Jungle', 'Mid', 'AD Carry', 'Support'
      ]},
      info: { title: 'Player Info', type: 'Text' },
      currentTeam: { title: 'Player\'s Team', type: 'Text'},
      rank : 'Number'
    },
    urlRoot:'/players',
    idAttribute: "_id",
    upVote: function(callback){
      var self = this;
      $.ajax({
        url: '/players/'+self.get('_id')+'/upvote',
        type: 'POST',
        success: function(data) {
          var doSort = (self.get('rank') == data.rank)?false:true;
          self.set({votes:data.votes, voteScore:data.voteScore, rank:data.rank});
          callback(doSort);
        },
      });
    },
    downVote: function(callback){
      var self = this;
      $.ajax({
        url: '/players/'+self.get('_id')+'/downvote',
        type: 'POST',
        success: function(data) {
          var doSort = (self.get('rank') == data.rank)?false:true;
          self.set({votes:data.votes, voteScore:data.voteScore, rank:data.rank});
          callback(doSort);
        },
      });
    }
  });
  app.Models.Player = Player;

  var Players = Backbone.Collection.extend({
    model: Player,
    url : '/players',
    initialize: function(players){
      var self = this;
      app.on('playerVote:up', function(player,view){
        player.upVote(function(doSort){
          if(doSort){
            self.fetch({
              reset:true,
              success:function(collection, response, options){
                self.sort();
                app.trigger('playerView:sort');
              },
              error:function(collection, response, options){
                alert(response);
              }
            });
          }else{
            view.$el.find('.player-votecount').text(player.get('votes'));
            view.$el.find('.player-votescore').text(player.get('voteScore'));
            view.$el.find('.player-rank').text(player.get('rank'));
          }
        });
      });
     
      app.on('playerVote:down', function(player,view){
        player.downVote(function(doSort){
          if(doSort){
            self.fetch({
              reset:true,
              success:function(collection, response, options){
                self.sort();
                app.trigger('playerView:sort');
              },
              error:function(collection, response, options){
                alert(response);
              }
            });
          }else{
            view.$el.find('.player-votecount').text(player.get('votes'));
            view.$el.find('.player-votescore').text(player.get('voteScore'));
            view.$el.find('.player-rank').text(player.get('rank'));
          }
        });
      });
    },
    comparator: function(player) {
      return player.get('rank');
    },
  });
  app.Collections.Players = Players;

  var PlayerView = Marionette.ItemView.extend({
    template: '#player-summary-template',
    tagName: 'li',
    className: 'player media',
    events: {
      'click .player-link': app.Methods.captureLink,
      'click .up-vote': 'upVote',
      'click .down-vote': 'downVote'
    },
    initialize: function(options){
      if(options.template) {
        this.template = options.template;
      }
    },
    upVote : function(){
      app.trigger('playerVote:up', this.model,this);
    },
    downVote : function(){
      app.trigger('playerVote:down', this.model,this);
    }
  });
  app.Views.PlayerView = PlayerView;

  var PlayersView = Marionette.CollectionView.extend({
    tagName: "ul",
    id: "players",
    className: "media-list",
//    template: "#players-template",
    itemView: PlayerView,
    initialize : function(){
      var self = this;
      app.on('playerView:sort', function(){
        self.render();
      });
    }
  });
  app.Views.PlayersView = PlayersView;

  var PlayerDetailView = Marionette.CompositeView.extend({
    tagName: "div",
    id: "player-detail-container",
    className: "player media",
    template: "#player-detail-template",
    itemView: PlayerView,
    itemViewContainer: '#player-details',
    itemViewOptions: { template:"#player-template"},
    events: {
      'click .edit-player': 'showPlayerForm',
      'click .save-player': 'savePlayer',
      'click .edit-cancel': 'cancelEdit'
    },
    showPlayerForm: function(){
      var form = new Backbone.Form({
        model: this.options.collection.models[0]
      }).render();
      $('.player-form').empty().prepend(form.el);
      $('.confirm-buttonset').show();
      this.options.form = form;
    },
    savePlayer: function(){
      var form = this.options.form;
      form.commit();
      form.model.save();
      $('.player-form').empty();
      $('.confirm-buttonset').hide();
      this.render();
    },
    cancelEdit: function(){
      $('.player-form').empty();
      $('.confirm-buttonset').hide();
      this.render();
    }
  });
 
  app.Views.PlayerDetailView = PlayerDetailView;

});