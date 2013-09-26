module.exports = function(mongoose){
  var Schema = mongoose.Schema;
  var playerSchema = new Schema({
    name: String,
    nick: String,
    info: String,
    position: String,
    picPath: String,
    votes: Number,
    voteScore: Number,
    rank: Number,
    positionIndex: Number,
    currentTeam: String
  });

  playerSchema.pre('save', function (next) {
console.log('saves');
console.dir(this);

    var playerPositions = ['Top', 'Jungle', 'Mid', 'AD Carry', 'Support'];
    this.positionIndex = playerPositions.indexOf(this.position);
    next();
  });

  var Player = mongoose.model('Player', playerSchema);
};