define([
   "jquery",
    "backbone",
//    "backbone.wreqr",
//    "backbone.babysitter",
//    "backbone-forms",
    "marionette",
    "app/app",
    "app/controller"
  ], function($, Backbone, Marionette,app, controller){
    app.Controllers.main = controller
    var AppRouter = Backbone.Marionette.AppRouter.extend({
      controller:controller,
      appRouter:{
        "test":"testMethod"
      },
      routes: {
        "": "main",
        "/": "main",
        "players(/:player)": "player",
        
      },

      main: function() {
        app.currentPageName.set({name:'Main'});
        var mainView = new app.Views.MainView();
        app.content.show(mainView);
      },

      player: function(player_id) {
        var players = new app.Collections.Players();
        if(typeof player_id === 'undefined' || player_id === null){
          app.currentPageName.set({name:'Players'});
          players.fetch({
            success: function(collection){
              collection.sort();
              var playersView = new app.Views.PlayersView({
                collection: collection
              });
              app.content.show(playersView);
            }
          });
        }else{
          app.currentPageName.set({name:'Player'});
          var player = new app.Models.Player({_id:player_id});
          player.fetch({
            success: function(model){
              players.add(model);
              var playerDetailView = new app.Views.PlayerDetailView({
                collection:players
              });
              app.content.show(playerDetailView);
            }
          });
        }
      }
    });

    var router = new AppRouter();
    app.Routers.main = router;
    
    return router;
});