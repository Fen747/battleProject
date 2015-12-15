Meteor.publish("getUserInGame", function(argument){
  let cursor = Modules.both.queryGet({
    type: 'gameListDB',
    method: 'find',
    query: {
      'players._id': this.userId
    },
    projection: {
      fields: { players: true },
      sort: { _id: 1},
      limit: 1
    }
  });

  console.log(cursor.fetch());

  return [cursor, Modules.both.queryGet({
    type: 'users',
    method: 'find',
    query: {
      _id: { $in: cursor.fetch()[0].players.map(function(elem) {
        return elem._id;
      })}
    },
    projection: {
      sort: { _id: 1},
      limit: 2
    }
  })];
});
