define([
   "jquery",
    "backbone",
//    "backbone.wreqr",
//    "backbone.babysitter",
    "backbone-forms",
    "marionette",
    "module"
  ], function($, Backbone, backbone_forms, Marionette, module){

  var app = new Marionette.Application();

  app.addRegions({
    header: '#header',
    content: '#content',
    footer: '#footer'
  });

  app.Models = {};
  app.Collections = {};
  app.Views = {};
  app.Controllers = {};
  app.Routers = {};
  app.Methods = {
    cleanPath: function(path){
      return path.replace('/','');
    },
    captureLink: function(e){
      e.preventDefault();
      var navHref = $(e.target).attr('href');
      app.Routers.main.navigate(app.Methods.cleanPath(navHref),{trigger:true});
    }
  };

  var MainView = Marionette.ItemView.extend({
    template: '#main-template',
  });

  app.Views.MainView = MainView;

  app.on('initialize:after', function() {
    $('nav a').click(app.Methods.captureLink);
    var initPath =  module.config().path;
    app.Routers.main.navigate(app.Methods.cleanPath(initPath),{trigger:true});
    Backbone.history.start({pushState: true, root:'/'});
  });

  return app;
});
