Meteor.publish("getPosition", function(argument){
    return _Pos.find({}, {
        sort: {
          _id: 1
        },
        limit: 2
    });
});
