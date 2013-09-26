require.config({
  baseUrl: "/js",
    paths: {
        "json2" : "lib/json2",
        "jquery": "lib/jquery-2.0.3",
        "underscore":"lib/underscore",
        "bootstrap":"bootstrap/bootstrap",
        "bootstrap-tour":"bootstrap/bootstrap-tour",
        "backbone": "backbone/backbone",
        "backbone.wreqr" : "backbone/backbone.wreqr",
        "backbone.babysitter" : "backbone/backbone.babysitter",
        "backbone-forms":"backbone/backbone-forms/backbone-forms",
        "marionette":"backbone/backbone.marionette_amd"
    },
    shim: {
      "jquery": {
        exports:"jquery"
      },
      "underscore": {
        exports:"_"
      },
      "backbone": {
        deps: ["underscore","json2","jquery"],
        exports:"Backbone"
      },
      "backbone.wreqr": {
        deps : ['backbone']
      },
      "backbone.babysitter":{
        deps : ['backbone']
      },
      "backbone-forms":{
        deps : ['backbone']
      },
      "bootstrap": {
        deps: ["jquery"]
      },
      "bootstrap-tour": {
        deps: ["bootstrap"]
      }
    },
//    enforceDefine: true
});

require(['bootstrap-tour','app/main']);
