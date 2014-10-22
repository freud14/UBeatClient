// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
  paths: {
    jquery: 'libs/jquery/jquery',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone'
  },
  shim: {
    backbone: {
      //These script dependencies should be loaded before loading backbone.js
      deps: ['underscore', 'jquery'],
      //Once loaded, use the global 'Backbone' as the module value.
      exports: 'Backbone'
    },
    underscore: {
      exports: '_'
    }
  }
});

require([
  // Load our app module and pass it to our definition function
  'app',
], function(App){
  // The "app" dependency is passed in as "App"
  App.initialize();
});
