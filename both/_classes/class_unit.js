class_unit = function (aType, anOwner, aPhaserItem) {
  "use strict";

  let attr = {
      type        : aType,
      owner       : null,
      troopSize   : 100,
      moral       : 100,
      effects     : [],
      position    : [],
      phaser_item : null
  };

  // Getters
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
  this.getAttr      = ( ) => {
    return attr;
  };

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
};

class_unit.prototype = {
  move: function ( position ) {
    this.setPosition([0, 0]);
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
