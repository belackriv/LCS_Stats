
/*
 * GET users listing.
 */

var getPlayer = function(req,res){
  var Player = req.app.Models.Player;
  Player.findOne({_id:req.params.id}).limit(1).exec(function(err, player){
    res.json(player);
  });
};

var updatePlayer = function(req,res){
  var Player = req.app.Models.Player;
  var player = req.body;
  Player.findById(player._id,function(err, foundPlayer){
    delete player.votes;
    delete player.voteScore;
    //delete player.rank;
    foundPlayer.set(player);
    foundPlayer.save(function (err, updatedPlayer, numberAffected){
      if(err){
        console.log(err)
      }
      res.json(updatedPlayer);
    });
  });
};

var upvotePlayer = function(req,res){
  var Player = req.app.Models.Player;
  var updateObj = {
    '$inc' : {
      'votes':1,
      'voteScore':1
    }
  };
  Player.findByIdAndUpdate(req.params.id,updateObj,function(err, player){
    var swapRankQuery = {
      '$and' : [
        { 'voteScore' : { '$lt' : player.voteScore } },
        { 'rank' : {'$lt' : player.rank } }
      ]
    };
    Player.find(swapRankQuery,null,{sort:{rank:'asc'}},function(err,docs){
      if(err){
        console.log(err);
      }
console.log('upvote!->\n');
console.dir(docs);
      var newRank = player.rank;
      for(var i = 0,docsLen = docs.length; i < docsLen; i++ ){
        Player.findByIdAndUpdate(docs[i]._id,{ '$inc' : { 'rank' : 1 } }).exec();
        if(i == 0)
          newRank = docs[0].rank;
      }
      Player.findByIdAndUpdate(player._id,{ '$set' : { 'rank' : newRank } }).exec();
      res.json({votes:player.votes, voteScore: player.voteScore, rank: newRank});
    });
  });
};

var downvotePlayer = function(req,res){
  var Player = req.app.Models.Player;
  var updateObj = {
    '$inc' : {
      'votes':1,
      'voteScore':-1
    }
  };
  Player.findByIdAndUpdate(req.params.id,updateObj,function(err, player){
    var swapRankQuery = {
      '$and' : [
        { 'voteScore' : { '$gt' : player.voteScore } },
        { 'rank' : {'$gt' : player.rank } }
      ]
    };
    Player.find(swapRankQuery,null,{sort:{rank:'asc'}},function(err,docs){
      if(err){
        console.log(err);
      }
console.log('downvote!->\n');
console.dir(docs);
      var newRank = player.rank;
      for(var i = 0,docsLen = docs.length; i < docsLen; i++ ){
        Player.findByIdAndUpdate(docs[i]._id,{ '$inc' : { 'rank' : -1 } }).exec();
        if(i == 0)
          newRank = docs[0].rank;
      }
      Player.findByIdAndUpdate(player._id,{ '$set' : { 'rank' : newRank } }).exec();
      res.json({votes:player.votes, voteScore: player.voteScore, rank: newRank});
    });
  });
};

var getPlayers = function(req, res){
  var Player = req.app.Models.Player;
  Player.find({}).limit(50).exec(function(err, players){
    res.json(players);
  });
};

module.exports = function(app){
  app.get('/players/:id', getPlayer);
  app.put('/players/:id', updatePlayer);
  app.post('/players/:id/upvote', upvotePlayer);
  app.post('/players/:id/downvote', downvotePlayer);
  app.get('/players', getPlayers);
};
