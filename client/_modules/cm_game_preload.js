let preload = ( ) => {
  Modules.client.Game.instance.stage.disableVisibilityChange = true;
  
  Modules.client.Game.instance.load.image('sky', 'assets/sky.png');
  Modules.client.Game.instance.load.image('ground', 'assets/platform.png');
  Modules.client.Game.instance.load.image('star', 'assets/star.png');
  Modules.client.Game.instance.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  Modules.client.Game.instance.load.spritesheet('dude2', 'assets/dude2.png', 32, 48);
};

Modules.client.Game.preload = preload;
