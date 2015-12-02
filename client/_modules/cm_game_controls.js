const MARGE_ERREUR_MOUVEMENT = 2;
const VITESSE_MOUVEMENT = 200;
const DISTANCE_RALENTISSEMENT = 30;
const RAYON_UNITE = 15;
let unit, vitesse;
let boolGetUnit = false;

let mouvement = { x: null };
let action;

let controlsUnit = (action) => {
  if (!boolGetUnit) {
    unit = instance_AllUnits.get(Meteor.user().username);
    boolGetUnit = true;
  }

  var isClick = action instanceof Phaser.Pointer;

  if (isClick) {
    // On stock la derniere demande de mouvement
    // On calcul la compensation camera qui permet de savoir ou on se trouve dans le monde pour se deplacer en fonction
    let compensationCamera = Game.camera.position.x - (GAME_WIDTH / 2);
    mouvement.x = Math.round(Game.input.position.x + compensationCamera);
    mouvement.x -= RAYON_UNITE;
  }

  unit.body.velocity.x = 0;
  if (mouvement.x != null) {
    distanceRestante = Math.abs(mouvement.x - unit.position.x);

    // GEstion des ralentissements du personnage en bout de course
    vitesse = VITESSE_MOUVEMENT;
    if (distanceRestante < DISTANCE_RALENTISSEMENT  ) {
      vitesse = VITESSE_MOUVEMENT * ((distanceRestante * (VITESSE_MOUVEMENT / DISTANCE_RALENTISSEMENT/2)) / 100);
    }

    if (unit.position.x < (mouvement.x + MARGE_ERREUR_MOUVEMENT) && unit.position.x < (mouvement.x - MARGE_ERREUR_MOUVEMENT)) {
        //  Move to the right, on doit bouger
        unit.body.velocity.x = vitesse;
        unit.animations.play('right');
    } else if (unit.position.x > (mouvement.x + MARGE_ERREUR_MOUVEMENT) && unit.position.x > (mouvement.x - MARGE_ERREUR_MOUVEMENT))  {
        unit.body.velocity.x = -vitesse;
        unit.animations.play('left');
    } else {
        // On est arriver, on ne bouge plus
        unit.animations.stop();
        unit.frame = 4;
    }
  }

   _Pos.update({
      _id: Meteor.userId(),
    }, {
      $set: {
        xPos: unit.position.x,
        yPos: unit.position.y,
      }
    });
};

Modules.client.Game.controlsUnit    = controlsUnit;
