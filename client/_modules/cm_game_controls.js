const MARGE_ERREUR_MOUVEMENT = 4;
const VITESSE_MOUVEMENT = 200;

let mouvement = { x: null };

let controlsUnit = (player) => {
  let cursors = Game.input.keyboard.createCursorKeys();

  player.body.velocity.x = 0;

      if (cursors.right.isDown) {
        //  Move to the right, on doit bouger
        player.body.velocity.x = VITESSE_MOUVEMENT;
        player.animations.play('right');
    } else if (cursors.left.isDown)  {
        player.body.velocity.x = -VITESSE_MOUVEMENT;
        player.animations.play('left');
    } else {
        // On est arriver, on ne bouge plus
        player.animations.stop();
        player.frame = 4;
    }

   _Pos.update({
      _id: Meteor.userId(),
    }, {
      $set: {
        xPos: player.position.x,
        yPos: player.position.y,
      }
    });
};

Modules.client.Game.controlsUnit    = controlsUnit;
