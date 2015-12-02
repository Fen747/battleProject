let create = ( ) => {

  // On définit la taille du monde
  // @TODO Il faudra certainement gérer des maps
  Modules.client.Game.instance.world.setBounds(0, 0, 1920, 600);

  // On fait en sorte que le jeu se redimensionne selon la taille de l'écran
		Modules.client.Game.instance.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		Modules.client.Game.instance.scale.setShowAll();
		window.addEventListener('resize', function () {
			Modules.client.Game.instance.scale.refresh();
		});
		Modules.client.Game.instance.scale.refresh();

  //  We're going to be using physics, so enable the Arcade Physics system
  Modules.client.Game.instance.physics.startSystem(Phaser.Physics.ARCADE);

  //  On positionne le backgroud ici. Redimensonné à la taille du jeu
  this.background = Modules.client.Game.instance.add.sprite(0, 0, 'sky');
  this.background.width = Modules.client.Game.instance.width;
	this.background.height = Modules.client.Game.instance.height;

  //  The platforms group contains the ground and the 2 ledges we can jump on
  Groups.platforms = Game.add.group();

  //  We will enable physics for any object that is created in this group
  Groups.platforms.enableBody = true;

  // Here we create the ground.
  let ground = Groups.platforms.create(0, Modules.client.Game.instance.world.height - 64, 'ground');

  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  ground.scale.setTo(6, 2);

  //  This stops it from falling away when you jump on it
  ground.body.immovable = true;

  //  Now let's create two ledges
  let ledge = Groups.platforms.create(400, 400, 'ground');
  ledge.body.immovable = true;

  ledge = Groups.platforms.create(-150, 250, 'ground');
  ledge.body.immovable = true;

  Groups.units = Game.add.group();
  Groups.units.enableBody = true;

  Meteor.users.find({}, { sort: { _id: 1 } }).fetch().forEach(function(user, index, array) {
    unit = instance_AllUnits.add(user, index*32);
    myUnit = new class_unit("dumb", Meteor.userId(), unit);
    myUnit.logMyAttr();
  });

  // On demande à la caméra de suivre ce joueur
  //Modules.client.Game.instance.camera.follow(unit);

  //  Finally some stars to collect
  Groups.stars = Modules.client.Game.instance.add.group();

  //  We will enable physics for any star that is created in this group
  Groups.stars.enableBody = true;

  //  Here we'll create 12 of them evenly spaced apart
  for (var i = 0; i < 12; i++)
  {
      //  Create a star inside of the 'stars' group
      let star = Groups.stars.create(i * 70, 0, 'star');

      //  Let gravity do its thing
      star.body.gravity.y = 300;

      //  This just gives each star a slightly random bounce value
      //star.body.bounce.y = 0.7 + Math.random() * 0.2;
  }

  //  The score
  scoreText = Modules.client.Game.instance.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

  // Au clic, on map un event
  Game.input.onDown.add(Modules.client.Game.controlsUnit, this);
};

Modules.client.Game.create    = create;
