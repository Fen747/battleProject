class_unit = function (aType, anOwner, aPhaserItem) {
  "use strict";

  /*****************************************************************************
  ** Private attributes__
  */
  let attr = {
      type        : aType || null,
      owner       : null,
      troopSize   : 100,
      moral       : 100,
      effects     : [],
      position    : [],
      phaser_item : aPhaserItem || null,
      speed       : {
        max     : 200,
        current : 0
      }
  };
  /* __Private attributes
  *****************************************************************************/

  /*****************************************************************************
  ** Public attributes__
  */
  this.action = {
    type : null
  };
  /* __Public attributes
  *****************************************************************************/


  /*****************************************************************************
  ** Getters__
  */
  this.getType      = ( ) => {
    return attr.type;
  };
  this.getOwner     = ( ) => {
    return attr.owner;
  };
  this.getTroopSize = ( ) => {
    return attr.troopSize;
  };
  this.getMoral     = ( ) => {
    return attr.moral;
  };
  this.getEffects   = ( ) => {
    return attr.effets;
  };
  this.getPosition  = ( ) => {
    return attr.position;
  };
  this.getPhaserItem  = ( ) => {
    return attr.phaser_item;
  };
  this.getAction  = ( ) => {
    return attr.action;
  };
  this.getCurSpeed  = ( ) => {
    return attr.speed.current;
  };
  this.getMaxSpeed  = ( ) => {
    return attr.speed.max;
  };
  this.getAttr      = ( ) => {
    return attr;
  };
  /* __Getters
  *****************************************************************************/

  /*****************************************************************************
  ** Setters
  */
  this.setType      = ( aType ) => {
    attr.type = aType;
  };
  this.setOwner     = ( anOwner ) => {
    attr.owner = anOwner;
  };
  this.setTroopSize = ( aTroopSize ) => {
    attr.troopSize = aTroopSize;
  };
  this.setMoral     = ( aMoral ) => {
    attr.moral = aMoral;
  };
  this.setAnEffect   = ( anEffect ) => {
    return attr.effets;
  };
  this.unsetAnEffect = ( anEffect ) => {
    return attr.effets;
  };
  this.setPosition  = ( aPosition ) => {
    attr.position = aPosition;
  };
  this.setCurSpeed  = ( aSpeed ) => {
    attr.speed.current = aSpeed;
  };
  /* __Setters
  *****************************************************************************/
};

class_unit.prototype = {
  doAction: function () {
    switch (this.action.type) {
        case 'move':
        {
            let destination             = this.action.toPos,
                unit                    = this.getPhaserItem(),
                vitesse                 = this.getCurSpeed(),
                VITESSE_MOUVEMENT       = this.getMaxSpeed(),
                MARGE_ERREUR_MOUVEMENT  = 2,
                DISTANCE_RALENTISSEMENT = 30;

            if (destination != null) {
              distanceRestante = Math.abs(destination - unit.position.x);

              // Si on est à l'arret
              if (!vitesse)
              {
                this.setCurSpeed(VITESSE_MOUVEMENT);
              }

              // GEstion des ralentissements du personnage en bout de course
              if (distanceRestante < 30 )
              {
                vitesse = VITESSE_MOUVEMENT * ((distanceRestante * (VITESSE_MOUVEMENT / DISTANCE_RALENTISSEMENT / 2)) / 100);
                this.setCurSpeed(vitesse);
              }

              if (unit.position.x < (destination + MARGE_ERREUR_MOUVEMENT) && unit.position.x < (destination - MARGE_ERREUR_MOUVEMENT))
              {
                  //  Move to the right, on doit bouger
                  unit.body.velocity.x = vitesse;
                  unit.animations.play('right');
              }
              else if (unit.position.x > (destination + MARGE_ERREUR_MOUVEMENT) && unit.position.x > (destination - MARGE_ERREUR_MOUVEMENT))
              {
                  unit.body.velocity.x = -vitesse;
                  unit.animations.play('left');
              }
              else
              {
                  // On est arriver, on ne bouge plus
                  this.getPhaserItem().body.velocity.x = 0;
                  this.setCurSpeed(0);
                  this.action = { type: null };
                  unit.animations.stop();
                  unit.frame = 4;
              }
            }
            break;
        }
        default:
        {
            this.getPhaserItem().body.velocity.x = 0;
            this.action = { type: null };
            break;
        }
    }
  },

  move: function ( toPosition ) {
    this.action = {
      type  : "move",
      toPos : toPosition
    };
  },

  attack: function ( aUnit ) {
    // TODO
  },

  getNewEffect: function ( anEffec ) {
    // body...
  },

  logMyAttr: function () {
    console.log(this.getAttr());
  }
};
