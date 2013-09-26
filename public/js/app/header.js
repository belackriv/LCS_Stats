define([
   "jquery",
    "backbone",
//    "backbone.wreqr",
//    "backbone.babysitter",
//    "backbone-forms",
    "marionette",
    "app/app"
  ], function($, Backbone, Marionette,app){

  var CurrentPageName = Backbone.Model.extend({
    defaults:{ name:'/' },
  });

  app.Models.CurrentPageName = CurrentPageName;

  var HeaderView = Marionette.ItemView.extend({
    template: '#header-template'
  });

  var currentPageName = new CurrentPageName();
  app.currentPageName = currentPageName;

  var startPageTour = function(event){
    var tours = {
      Main:[
        {
          element:'h1',
          placement:'bottom',
          title:'Main Page',
          content:'This is the main page.  Nothing to see here, move along.'
        }
      ],
      Players:[
        {
          element:'.well:first',
          placement:'right',
          title:'Player List',
          content:'This show a list of players, ordered by rank.'
        },
        {
          element:'.player-link:first',
          placement:'bottom',
          title:'Player Link',
          content:'Click this link to view more details about the player.'
        },
        {
          element:'.up-vote:first',
          title:'Player Votes',
          content:'You can up vote and down vote a player to adjust their rank.'
        }
      ],
      Player:[
        {
          element:'.player-info',
          placement:'left',
          title:'Player Details',
          content:'This shows a list of details about a player.'
        },
        {
          element:'.edit-player',
          title:'Edit Player Details',
          content:'Click this button to edit player details.'
        }
      ]
    };
    var tour = new Tour({
      name:this.model.get('name'),
      onEnd:function(tour){
        tour.removeState("current_step");
        tour.removeState("end");
        tour.setCurrentStep(0);
      }
    });
    tour.addSteps(tours[this.model.get('name')]);
    tour.start(true);
  };

  app.Methods.startPageTour = startPageTour;

  var headerView = new HeaderView({
    model: currentPageName,
     events: {
      'click .start-app-tour-link': startPageTour
    }
  });

  app.header.show(headerView);
});