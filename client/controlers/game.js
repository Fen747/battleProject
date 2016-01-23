Template.game.onRendered(function() {

});

Template.game.onCreated(function(){
  Meteor.subscribe("getPosition", function() {
  });

  Meteor.subscribe("getUserInGame", function() {
  });


  $(document).ready(function() {
    Modules.client.Game.instance = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'divGame', {
      preload : Modules.client.Game.preload,
      create  : Modules.client.Game.create,
      update  : Modules.client.Game.update
    });
    Game = Modules.client.Game.instance;
    //Modules.client.Game.instance.transparent = true;
  });



});

Template.game.helpers({
  listPlayers: function(){
    let cursor =  Modules.both.queryGet({
      type: 'gameListDB',
      method: 'findOne',
      query: {
        _id: Session.get('gameId')
      },
      projection: {
        field: { players: true }
      }
    });

    if (cursor) {
      let players = cursor.players.map(function(e) {
        return e._id;
      });

      console.log(players);

      return Modules.both.queryGet({
        type: 'users',
        method: 'find',
        query: {
          _id: { $in: players}
        },
        projection: {
          fields:  { username: true },
          sort: { _id: 1},
          limit: 2
        }
      });

    }



  }




});

window.onbeforeunload = function() {
  //Game.destroy();
};



/*

function collectStar (player, star) {
  // Removes the star from the screen
  star.kill();

  //  Add and update the score
  score += 10;
  scoreText.text = 'Score: ' + score;
}
*/
