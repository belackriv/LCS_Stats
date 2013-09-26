var mongoose = require('mongoose');

module.exports = function(app){
  app.Models = {};
  mongoose.connect('mongodb://localhost/lcs_stats');

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
    // yay!
    console.log('db open');
    require('./Player')(mongoose);


    app.Models.Player = mongoose.model('Player');
  });
};