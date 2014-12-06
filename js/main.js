
// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
  paths: {
    jquery: 'libs/jquery/jquery',
    bootstrap: 'libs/bootstrap',
    'jquery.cookie': 'libs/plugins/jquery.cookie',
    'bootstrap-notify': 'libs/plugins/bootstrap-notify',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone',
    md5: 'libs/md5.min',
  },
  shim: {
    bootstrap: {
      deps: ['jquery']
    },
    backbone: {
      //These script dependencies should be loaded before loading backbone.js
      deps: ['underscore', 'jquery'],
      //Once loaded, use the global 'Backbone' as the module value.
      exports: 'Backbone'
    },
    underscore: {
      exports: '_'
    },
    'jquery.cookie': {
      deps: ['jquery']
    },
    'bootstrap-notify': {
      deps: ['jquery', 'bootstrap']
    },
  }
});

require([
  // Load our app module and pass it to our definition function
  'app',
], function(App){
  // The "app" dependency is passed in as "App"
  App.initialize();
});
