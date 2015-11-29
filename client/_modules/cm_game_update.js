let update = ( ) => {
  //  Collide the player and the stars with the platforms
  Modules.client.Game.instance.physics.arcade.collide(Data.groups.units, Data.groups.platforms);
  Modules.client.Game.instance.physics.arcade.collide(Data.groups.stars, Data.groups.platforms);

  //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
  //Modules.client.Game.instance.physics.arcade.overlap(player, stars, collectStar, null, this);

  // Gestion des déplacement
  //controlsCommand();
};


Modules.client.Game.update    = update;
