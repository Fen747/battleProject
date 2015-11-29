Template.game.onRendered(function() {

});

Template.game.onCreated(function(){
  Meteor.subscribe("getPosition", function() {
    console.log(_Pos);

  });

  Meteor.subscribe("getAllPlayers", function() {
    console.log(Meteor.users.find().fetch());

    $(document).ready(function() {
      Modules.client.Game.instance = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'divGame', {
        preload : Modules.client.Game.preload,
        create  : Modules.client.Game.create,
        update  : Modules.client.Game.update
      });
      Game = Modules.client.Game.instance;
      Modules.client.Game.instance.transparent = true;
    });
  });


});

Template.game.helpers({
  listPlayers: function(){
    return Meteor.users.find();
  }
});



/*

function collectStar (player, star) {
  // Removes the star from the screen
  star.kill();

  //  Add and update the score
  score += 10;
  scoreText.text = 'Score: ' + score;
}
*/
