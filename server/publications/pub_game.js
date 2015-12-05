Meteor.publish("lookingForPlayers", function(userId) {
  return Modules.both.queries.lookForReadyPlayer(userId);
});
