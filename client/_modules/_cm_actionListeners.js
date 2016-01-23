startListeners = ( ) => {
  console.log('Start listening');
  Modules.client.Game.socket = io('http://192.168.1.22:2000');

  console.log('Connected! Sending Ident');
  Modules.client.Game.socket.emit('logon', Meteor.userId());

  Modules.client.Game.socket.on('disconnect', function() {
      // La connexion au serveur de jeu est êdu, on relance le jeu coté client
      location.href=location.href;
  });

  Modules.client.Game.socket.on('addUnit', function(sprite, position, unitId, owner) {
    console.log(arguments);
    instance_AllUnits.add(sprite, position, unitId, owner);
  });

  Modules.client.Game.socket.on('validatedAction', function(unitId, actionDetails) {
    console.log('On a recu un ordre de la part du serveur ', unitId, actionDetails);
    instance_AllUnits.get(unitId).setAction(actionDetails);
  });


};
