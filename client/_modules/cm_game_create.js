let create = ( ) => {
  Modules.client.Game.socket = io('http://192.168.1.22:2000');

  Modules.client.Game.socket.on('connect', function() {
      console.log('Connected! Sending Ident');
      Modules.client.Game.socket.emit('logon', Meteor.userId());
  });

  Modules.client.Game.socket.on('disconnect', function() {
      // La connexion au serveur de jeu est êdu, on relance le jeu coté client
      location.href=location.href;
  });

  Modules.client.Game.socket.on('addUnit', function(sprite, position, unitId, owner) {
    instance_AllUnits.add(sprite, position, unitId, owner);
  });

  Modules.client.Game.socket.on('moved', function(unitId, destination) {
    console.log('Moved', unitId, destination);
      unit = instance_AllUnits.get(unitId);
      console.log(unit);
      unit.move(destination);
  });








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

  // On demande à la caméra de suivre ce joueur
      // Je commente car on ne suit pas le bon, et ça devient vite la merdouille pour les tests ^^
      // Actuellement, ça dépent de l'ordre de création des comptes
  // unit.focus();

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
