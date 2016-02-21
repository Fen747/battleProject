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
  /*Modules.client.Game.instance.physics.arcade.collide(Groups.units, Groups.units, ( obj1, obj2 ) => {
    // Ici, CollideCallback. Il ne s'exécute que si le 'processCallback' renvoie true
    // Il s'exécute après l'overlapping et la séparation
    unit1 = instance_AllUnits.get(obj1);
    unit2 = instance_AllUnits.get(obj2);

    if (unit1 != null && unit2 != null) {
      console.log('Collision detecté entre joueur', unit1, unit2);
      /*unit1.move(null);
      unit2.move(null);
    }


  }, ( obj1, obj2 ) => {
    // Ici, le 'processCallback'. Il s'exécute au début de l'overlapping et avant la séparation

    return true;
  });*/

  //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
  //Modules.client.Game.instance.physics.arcade.overlap(player, stars, collectStar, null, this);

  // Gestion des déplacement
  instance_AllUnits.update();

};


Modules.client.Game.update    = update;
