Meteor.publish("getAllPlayers", function(argument){
  return Meteor.users.find({}, {
    fields: {
      username: true
    },
    sort: {
      username: 1
    },
    limit: 2
  });
});
