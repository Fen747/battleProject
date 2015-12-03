let instance = {};

let data = {};

let groups = {
  stars     : null,
  platforms : null,
  units     : null
};

AllUnits = function() {
  let arrayUnit = {};

  this.add = function(user, position) {
    let yPos = Modules.client.Game.instance.world.height - 150,
        unit = Groups.units.create(position, yPos, 'dude');

    unit.body.bounce.y = 0.2;
    unit.body.gravity.y = 300;
    unit.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    unit.animations.add('left', [0, 1, 2, 3], 10, true);
    unit.animations.add('right', [5, 6, 7, 8], 10, true);

    //  We need to enable physics on the player
    Modules.client.Game.instance.physics.arcade.enable(unit);

    _Pos.remove({ _id: user._id });
    _Pos.insert({
      _id   : user._id,
      xPos  : position,
      yPos  : yPos
    });

    oUnit = new class_unit("dumb", Meteor.userId(), unit);
    oUnit.logMyAttr();

    arrayUnit[user.username] = oUnit;

    return oUnit;
  };

  this.remove = function(username) {
    delete(arrayUnit[username]);
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
    }
  };
};

Modules.client.Game           = {};
Modules.client.Game.data  = data;
Modules.client.Game.instance  = instance;
Modules.client.Game.AllUnits = AllUnits;
Modules.client.Game.groups = groups;

Game = Modules.client.Game.instance;
Data = Modules.client.Game.data;
Groups = Modules.client.Game.groups;
instance_AllUnits = new Modules.client.Game.AllUnits();
