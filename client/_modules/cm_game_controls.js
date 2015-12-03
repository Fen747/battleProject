const MARGE_ERREUR_MOUVEMENT = 2;
const VITESSE_MOUVEMENT = 200;
const DISTANCE_RALENTISSEMENT = 30;
const RAYON_UNITE = 15;
let oUnit, unit, vitesse;
let boolGetUnit = false;

let mouvement = { x: null };
let action;

let controlsUnit = (action) => {
  if (!boolGetUnit) {
    oUnit = instance_AllUnits.get(Meteor.user().username);
    unit = oUnit.getPhaserItem();
    boolGetUnit = true;
  }

  let isClick = action instanceof Phaser.Pointer;

  if (isClick) {
    // On stock la derniere demande de mouvement
    // On calcul la compensation camera qui permet de savoir ou on se trouve dans le monde pour se deplacer en fonction
    let compensationCamera = Game.camera.position.x - (GAME_WIDTH / 2);
    mouvement.x = Math.round(Game.input.position.x + compensationCamera);
    mouvement.x -= RAYON_UNITE;
    oUnit.move(mouvement.x);

    Modules.client.Game.socket.emit('goTo', Meteor.user().username, mouvement.x);
  }

  oUnit.doAction();
};

Modules.client.Game.controlsUnit    = controlsUnit;
