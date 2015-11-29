Template.game.onRendered(function() {
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



/*var controlsCommand = function() {
  var isClick = action instanceof Phaser.Pointer;
  player.body.velocity.x = 0;

  const MARGE_ERREUR_MOUVEMENT = 4;
  const VITESSE_MOUVEMENT = 200;

  var playerPositionX = Math.round(player.position.x);

  if (isClick) {
    // On stock la derniere demande de mouvement
    // On calcul la compensation camera qui permet de savoir ou on se trouve dans le monde pour se deplacer en fonction
    var compensationCamera = game.camera.position.x - (GAME_WIDTH/2);
    mouvement.x = Math.round(game.input.position.x + compensationCamera);
  }

  // Si on a l'ordre de bouger ,on calcule une marge d'erreur pour l'arrivée. Ceci permet d'éviter de boucler a cause du déplacement qui va trop loin puis trop court, etc...
  // @TODO : on peut corriger ou fortement diminuer cette marge d'erreur en gérant l'accélération du personnage
  if (mouvement.x != null || mouvement.x != undefined)
    if (playerPositionX < (mouvement.x + MARGE_ERREUR_MOUVEMENT) && playerPositionX < (mouvement.x - MARGE_ERREUR_MOUVEMENT)) {
        //  Move to the right, on doit bouger
        player.body.velocity.x = VITESSE_MOUVEMENT;
        player.animations.play('right');
    } else if (playerPositionX > (mouvement.x + MARGE_ERREUR_MOUVEMENT) && playerPositionX > (mouvement.x - MARGE_ERREUR_MOUVEMENT)) {
        //  Move to the right, on doit bouger
        player.body.velocity.x = -VITESSE_MOUVEMENT;
        player.animations.play('left');
    } else {
        // On est arriver, on ne bouge plus
        mouvement.x = null;
        player.animations.stop();
        player.frame = 4;
    }
}

function collectStar (player, star) {
  // Removes the star from the screen
  star.kill();

  //  Add and update the score
  score += 10;
  scoreText.text = 'Score: ' + score;
}
*/
