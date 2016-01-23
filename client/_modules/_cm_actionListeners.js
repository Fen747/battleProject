startListeners = ( ) => {
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

  Modules.client.Game.socket.on('validatedAction', function(unitId, actionDetails) {
    instance_AllUnits.get(unitId).setAction(actionDetails);
  });


};
