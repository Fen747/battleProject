const MARGE_ERREUR_MOUVEMENT = 2;
const VITESSE_MOUVEMENT = 200;
const DISTANCE_RALENTISSEMENT = 30;
const RAYON_UNITE = 15;
let oUnit, unit, vitesse;
let boolGetUnit = false;

let mouvement = { x: null };
let action;

let controlsUnit = (action) => {
  let isClick = action instanceof Phaser.Pointer;

  if (isClick && Modules.client.Game.oUnit != null && Game.input.activePointer.rightButton.isDown) {
    // On stock la derniere demande de mouvement
    // On calcul la compensation camera qui permet de savoir ou on se trouve dans le monde pour se deplacer en fonction
    let compensationCamera = Game.camera.position.x - (GAME_WIDTH / 2);
    mouvement.x = Math.round(Game.input.position.x + compensationCamera);
    mouvement.x -= RAYON_UNITE;

    Modules.client.Game.socket.emit('askValidateAction',  Session.get('gameId'), Modules.client.Game.oUnit.getUnitId(), {type: 'move',  args: {toPos: mouvement.x}});
  }

  if (Modules.client.Game.oUnit != null) {
    Modules.client.Game.oUnit.doAction();
  }

};

Modules.client.Game.controlsUnit    = controlsUnit;
