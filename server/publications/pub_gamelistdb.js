Meteor.publish("getUserInGame", function(){
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

  let players = cursor.fetch()[0].players.map(function(elem) {
    console.log('ID PUBLISH :::: '+elem._id);
    return elem._id;
  });

  return [cursor, Modules.both.queryGet({
    type: 'users',
    method: 'find',
    query: {
      _id: { $in: players }
    },
    projection: {
      sort: { _id: 1},
      limit: 2
    }
  })];
});
