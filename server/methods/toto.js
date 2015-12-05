Meteor.methods({
  setReady: function() {
    Meteor.users.update(this.userId, { $set: {
      battle: {
        ready: true
      }
    } });



/*    let gId = GameListDB.insert({
      players   : [{
        _id   : this.userId,
        ready : true
      }],
      unitList  : []
    });
    GameListInstances[gId] = Modules.both.queryGet({
      type    : 'gameListDB',
      method  : 'findOne',
      query   : { _id: gId }
    });*/
  },

  unSetReady: function() {
    Meteor.users.update(this.userId, { $set: {
      battle: {
        ready: false
      }
    } });
  }

});
