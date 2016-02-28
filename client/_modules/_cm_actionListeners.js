startListeners = ( ) => {
  console.log('Start listening');
  Modules.client.Game.socket = io('http://dux-bellorum.ovh:2000');

  console.log('Connected! Sending Ident');
  Modules.client.Game.socket.emit('logon', Meteor.userId());

  Modules.client.Game.socket.on('disconnect', function() {
      // La connexion au serveur de jeu est êdu, on relance le jeu coté client
      location.href=location.href;
  });

  Modules.client.Game.socket.on('addUnit', function(sprite, position, unitId, owner) {
    instance_AllUnits.add(sprite, position, unitId, owner);
  });

  Modules.client.Game.socket.on('validatedAction', function(unitId, actionDetails, adjustedTime) {
    console.log('On a recu un ordre de la part du serveur ', unitId, actionDetails, adjustedTime);
    var localTime = new Date().getTime();
    var timeReference = localTime - adjustedTime;

    setTimeout(function() {
        instance_AllUnits.get(unitId).setAction(actionDetails);
    }, timeReference);

  });

  Modules.client.Game.socket.on('ping', function(timestamp) {
    clientTimeStamp = new Date().getTime();
    Modules.client.Game.socket.emit('pong', timestamp, clientTimeStamp);
  });

  Modules.client.Game.socket.on('update_unit_pos', function(mesUnits) {
    depDEBUG.changed();
    for (var i = 0; i < mesUnits.length; i++) {
      var unit = mesUnits[i];
      document.getElementById(unit.id).innerHTML = unit.position;

      instance_AllUnits.get(unit.id).setPosition(unit.position);
    }
  });

};
