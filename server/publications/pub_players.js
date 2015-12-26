Meteor.publish("myself", function(){
  return Modules.both.queryGet({
    type: 'users',
    method: 'find',
    query: this.userId,
    projection: {
      sort: { _id: 1},
      limit: 1,
      fields: { services: false }
    }
  });
});
