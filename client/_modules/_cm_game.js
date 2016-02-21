let instance = {};

let data = {};

let groups = {
  stars     : null,
  platforms : null,
  units     : null
};

AllUnits = function() {
  let arrayUnit = {};

  this.add = function(sprite, position, unitId, owner) {
    let yPos = Modules.client.Game.instance.world.height - 150,
        unit = Groups.units.create(position, yPos, sprite);

    unit.body.bounce.y = 0.2;
    unit.body.gravity.y = 300;
    unit.alpha = 0.7;
    unit.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    unit.animations.add('left', [0, 1, 2, 3], 10, true);
    unit.animations.add('right', [5, 6, 7, 8], 10, true);

    //  We need to enable physics on the player
    Modules.client.Game.instance.physics.arcade.enable(unit);

    oUnit = new class_unit("dumb", owner, unit);
    oUnit.setUnitId(unitId);

    unit.inputEnabled = true;
    unit.events.onInputDown.add(function onDown(unit, pointer) {
     // do something wonderful here
     if (!Object.is(unit, oUnit) && Game.input.activePointer.leftButton.isDown) {
         myUnit = instance_AllUnits.get(unit);
         console.log('Clic sur une unité : ',myUnit.getOwner());

         if (myUnit.getOwner() == Meteor.userId()) {
           Modules.client.Game.oUnit = myUnit;
           instance_AllUnits.glow(unit);
         } else {
           console.log('TOUCHE PAS C PAS A TOI !');
         }
     }
    }, this);

    //oUnit.logMyAttr();

    arrayUnit[unitId] = oUnit;

    return oUnit;
  };

  this.remove = function(unitId) {
    delete(arrayUnit[unitId]);
  };

  this.get = function(argument) {
    if (argument)
    {
      if (typeof(argument) === 'object' && argument instanceof Phaser.Sprite)
      {
        for (let key in arrayUnit)
          if (Object.is(arrayUnit[key].getPhaserItem(), argument))
            return arrayUnit[key];
        return null;
      }
      return (argument ? arrayUnit[argument] : arrayUnit);
    } else {
      return arrayUnit;
    }
  };

  this.update = function() {
    for (unit in arrayUnit) {
      arrayUnit[unit].doAction();
    }
  };

  this.glow = function(unitGlow) {
    unitGlow.alpha = 1;

    for (unit in arrayUnit) {
      if (!Object.is(arrayUnit[unit].getPhaserItem(), unitGlow)) {
        arrayUnit[unit].getPhaserItem().alpha = 0.7;
      }
    }
  };
};

Modules.client.Game           = {};
Modules.client.Game.data  = data;
Modules.client.Game.instance  = instance;
Modules.client.Game.AllUnits = AllUnits;
Modules.client.Game.groups = groups;
Modules.client.Game.oUnit  = null;
Modules.client.Game.socket  = null;

Game = Modules.client.Game.instance;
Data = Modules.client.Game.data;
Groups = Modules.client.Game.groups;
instance_AllUnits = new Modules.client.Game.AllUnits();
