class_unit = function (aType, anOwner, aPhaserItem) {
  "use strict";

  /*****************************************************************************
  ** Private attributes__
  */
  let attr = {
      type        : aType || null,
      owner       : anOwner || null,
      troopSize   : 100,
      moral       : 100,
      energy      : 100,
      lifePoints  : 100,
      damage      : 1,
      range       : 3,
      effects     : [],
      position    : aPhaserItem.position.x,
      phaser_item : aPhaserItem || null,
      speed       : {
        max     : 200,
        current : 0
      }
  };

  let unitId = null;
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
  this.getUnitId	= ( ) => {
    return unitId;
  }

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
    attr.phaser_item.position.x = aPosition;
  };
  this.setCurSpeed  = ( aSpeed ) => {
    attr.speed.current = aSpeed;
  };
  this.setUnitId	= ( id ) => {
    if (unitId == null) {
      unitId = id;
    }
  }
  /* __Setters
  *****************************************************************************/
};

class_unit.prototype = {
  getAction: function() {
    return this.action;
  },

  setAction: function( action ) {
      this.action = action;
  },

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

              // GEstion des ralentissements du personnage en bout de course
              /*if (distanceRestante < 30 )
              {
                vitesse = VITESSE_MOUVEMENT * ((distanceRestante * (VITESSE_MOUVEMENT / DISTANCE_RALENTISSEMENT / 2)) / 100);
                this.setCurSpeed(vitesse);
              }
              else
              {*/
                this.setCurSpeed(VITESSE_MOUVEMENT);
              //}

              if (unit.position.x < (destination + MARGE_ERREUR_MOUVEMENT) && unit.position.x < (destination - MARGE_ERREUR_MOUVEMENT))
              {
                  //  Move to the right, on doit bouger
                  unit.body.velocity.x = this.getCurSpeed();
                  unit.animations.play('right');
              }
              else if (unit.position.x > (destination + MARGE_ERREUR_MOUVEMENT) && unit.position.x > (destination - MARGE_ERREUR_MOUVEMENT))
              {
                  unit.body.velocity.x = -this.getCurSpeed();
                  unit.animations.play('left');
              }
              else
              {
                  // On est arriver, on ne bouge plus
                  this.stop();
              }
            }
            break;
        }
        default:
        {
            this.stop();
            break;
        }
    }
  },

  stop: function (argument) {
    let unit = this.getPhaserItem();
    this.setCurSpeed(0);
    this.action = { type: null };
    unit.body.velocity.x = 0;
    unit.animations.stop();
    unit.frame = 4;
  },

  // myUnit.startAction('move', { x, y });
  startAction: function (func, args) {
    Modules.client.Game.socket.emit('validateAction', Session.get('gameId'), this.getUnitId(), { type: func, args });
  },

  logMyAttr: function () {
    console.log(this.getAttr());
  },


  getNewEffect: function ( anEffec ) {
    // body...
  },

  focus: function () {
    Modules.client.Game.instance.camera.follow(this.getPhaserItem());
  }

};
