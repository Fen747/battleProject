let boolGetUnit = false,
    unit, other, otherId, callbackContext = null;

let update = ( ) => {
  if (!boolGetUnit && _Pos.findOne !== undefined) {
    unit = instance_AllUnits.get(Meteor.user().username);
    boolGetUnit = true;
  }

  //  Collide the player and the stars with the platforms
  // doc  -> http://phaser.io/docs/2.4.4/Phaser.Physics.Arcade.html#collide
  // code -> https://github.com/photonstorm/phaser/blob/v2.4.4/src/physics/arcade/World.js
  // code ligne 375
  Modules.client.Game.instance.physics.arcade.collide(Groups.units, Groups.platforms);
  Modules.client.Game.instance.physics.arcade.collide(Groups.stars, Groups.platforms);
  Modules.client.Game.instance.physics.arcade.collide(Groups.units, Groups.units, ( ) => {
    // Ici, CollideCallback. Il ne s'exécute que si le 'processCallback' renvoie true
    // Il s'exécute après l'overlapping et la séparation
  }, ( obj1, obj2 ) => {
    // Ici, le 'processCallback'. Il s'exécute au début de l'overlapping et avant la séparation
    instance_AllUnits.get(obj1).move(null);
    instance_AllUnits.get(obj2).move(null);
  });

  //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
  //Modules.client.Game.instance.physics.arcade.overlap(player, stars, collectStar, null, this);

  // Gestion des déplacement
  //Modules.client.Game.controlsUnit(instance_AllUnits.get('Sylchauf'), this);
  if (boolGetUnit) {

    docOther = Meteor.users.findOne({
      _id: { $ne:Meteor.userId() }
    });

    other = instance_AllUnits.get(docOther.username);
    let curPos = other.getPhaserItem().position.x;
    let dest = _Pos.findOne(docOther._id ).xPos;

    if (curPos != dest)
    {
      oUnit.move(dest);
    }

  }

  Modules.client.Game.controlsUnit();

};


Modules.client.Game.update    = update;
