var player;
var platforms;
var cursors;

var mouvement = {};

var stars;
var score = 0;
var scoreText;

var game;

const GAME_WIDTH = 1080;
const GAME_HEIGHT = 600;


Template.game.onRendered(function(){
  $(document).ready(function() {
      game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'divGame', { preload: preload, create: create, update: update });;
      game.transparent = true;
  });
});

function preload() {
  game.load.image('sky', 'assets/sky.png');
  game.load.image('ground', 'assets/platform.png');
  game.load.image('star', 'assets/star.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

function create() {
  // On définit la taille du monde
  // @TODO Il faudra certainement gérer des maps
  game.world.setBounds(0, 0, 1920, 600);

  // On fait en sorte que le jeu se redimensionne selon la taille de l'écran
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.setShowAll();
		window.addEventListener('resize', function () {
			game.scale.refresh();
		});
		game.scale.refresh();

  //  We're going to be using physics, so enable the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //  On positionne le backgroud ici. Redimensonné à la taille du jeu
  this.background = game.add.sprite(0, 0, 'sky');
  this.background.width = game.width;
	this.background.height = game.height;

  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = game.add.group();

  //  We will enable physics for any object that is created in this group
  platforms.enableBody = true;

  // Here we create the ground.
  var ground = platforms.create(0, game.world.height - 64, 'ground');

  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  ground.scale.setTo(6, 2);

  //  This stops it from falling away when you jump on it
  ground.body.immovable = true;

  //  Now let's create two ledges
  var ledge = platforms.create(400, 400, 'ground');
  ledge.body.immovable = true;

  ledge = platforms.create(-150, 250, 'ground');
  ledge.body.immovable = true;

  // The player and its settings
  player = game.add.sprite(32, game.world.height - 150, 'dude');
  // On demande à la caméra de suivre ce joueur
  game.camera.follow(player);

  //  We need to enable physics on the player
  game.physics.arcade.enable(player);

  //  Player physics properties. Give the little guy a slight bounce.
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;

  //  Our two animations, walking left and right.
  player.animations.add('left', [0, 1, 2, 3], 10, true);
  player.animations.add('right', [5, 6, 7, 8], 10, true);

  //  Finally some stars to collect
  stars = game.add.group();

  //  We will enable physics for any star that is created in this group
  stars.enableBody = true;

  //  Here we'll create 12 of them evenly spaced apart
  for (var i = 0; i < 12; i++)
  {
      //  Create a star inside of the 'stars' group
      var star = stars.create(i * 70, 0, 'star');

      //  Let gravity do its thing
      star.body.gravity.y = 300;

      //  This just gives each star a slightly random bounce value
      //star.body.bounce.y = 0.7 + Math.random() * 0.2;
  }

  //  The score
  scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

  // Au clic, on map un event
	game.input.onDown.add(controlsCommand, this);

}

function update() {

  //  Collide the player and the stars with the platforms
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.collide(stars, platforms);

  //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
  game.physics.arcade.overlap(player, stars, collectStar, null, this);

  // Gestion des déplacement
  controlsCommand('tick');
}

var controlsCommand = function(action) {
  var isClick = action instanceof Phaser.Pointer;
  player.body.velocity.x = 0;

  const MARGE_ERREUR_MOUVEMENT = 4;
  const VITESSE_MOUVEMENT = 200;

  var playerPositionX = Math.round(player.position.x);

  if (isClick) {
    // On stock la derniere demande de mouvement
    // On calcul la compensation camera qui permet de savoir ou on se trouve dans le monde pour se deplacer en fonction
    var compensationCamera = game.camera.position.x - (GAME_WIDTH/2);
    mouvement.x = Math.round(game.input.position.x + compensationCamera);
  }

  // Si on a l'ordre de bouger ,on calcule une marge d'erreur pour l'arrivée. Ceci permet d'éviter de boucler a cause du déplacement qui va trop loin puis trop court, etc...
  // @TODO : on peut corriger ou fortement diminuer cette marge d'erreur en gérant l'accélération du personnage
  if (mouvement.x != null || mouvement.x != undefined)
  if (playerPositionX < (mouvement.x + MARGE_ERREUR_MOUVEMENT) && playerPositionX < (mouvement.x - MARGE_ERREUR_MOUVEMENT)) {
      //  Move to the right, on doit bouger
      player.body.velocity.x = VITESSE_MOUVEMENT;
      player.animations.play('right');
  } else if (playerPositionX > (mouvement.x + MARGE_ERREUR_MOUVEMENT) && playerPositionX > (mouvement.x - MARGE_ERREUR_MOUVEMENT)) {
      //  Move to the right, on doit bouger
      player.body.velocity.x = -VITESSE_MOUVEMENT;
      player.animations.play('left');
  } else {
      // On est arriver, on ne bouge plus
      mouvement.x = null;
      player.animations.stop();
      player.frame = 4;
  }
}

function collectStar (player, star) {
  // Removes the star from the screen
  star.kill();

  //  Add and update the score
  score += 10;
  scoreText.text = 'Score: ' + score;
}
