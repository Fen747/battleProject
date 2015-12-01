let boolGetUnit = false;
let unit, other, otherId = null;

let update = ( ) => {
  if (!boolGetUnit && _Pos.findOne !== undefined) {
    unit = instance_AllUnits.get(Meteor.user().username);
    boolGetUnit = true;
  }


  //  Collide the player and the stars with the platforms
  Modules.client.Game.instance.physics.arcade.collide(Groups.units, Groups.platforms);
  Modules.client.Game.instance.physics.arcade.collide(Groups.stars, Groups.platforms);

  //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
  //Modules.client.Game.instance.physics.arcade.overlap(player, stars, collectStar, null, this);

  // Gestion des déplacement
  //Modules.client.Game.controlsUnit(instance_AllUnits.get('Sylchauf'), this);
  if (boolGetUnit) {

    docOther  = Meteor.users.findOne({
      _id: { $ne:Meteor.userId() }
    });

    other = instance_AllUnits.get(docOther.username);
    other.position.x = _Pos.findOne(docOther._id).xPos;


  }

  Modules.client.Game.controlsUnit();

};


Modules.client.Game.update    = update;
