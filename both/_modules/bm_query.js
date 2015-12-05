Meteor.startup(function() {

  let collections = {
    'users'      : Meteor.users,
    'gameListDB' : GameListDB
  };

  let queryGet = ( options ) => {
    return _getCollection( options.type )[ options.method ]( options.query || {}, options.projection || {} );
  };

  let _getCollection = ( type ) => {
    return collections[ type ];
  };

  let queryList = {
    lookForReadyPlayer: ( userId ) => {
      let uId;

      let projection = {};

      if (Meteor.isClient)
      {
        uId = Meteor.userId();
        console.log('UserIDClient', Meteor.userId());
      }
      else if (Meteor.isServer)
      {
        uId = userId;
        console.log('UserIDServer', userId);

        projection = {
            sort: { _id: 1 },
            limit: 1,
            fields  : { _id: true, username: true, battle: true }
          };
      }

      console.log(uId);
      var result = Meteor.users.find({
        _id             : { $ne: uId },
        "battle.ready"  : true
      }, projection);

      console.log(result.fetch());

      return result;
    }
  };

  Modules.both.queries = queryList;
  Modules.both.queryGet = queryGet;
  Modules.both.collections = collections;

});
