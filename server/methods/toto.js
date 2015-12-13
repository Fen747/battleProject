Meteor.methods({
  setReady: function() {
    Meteor.users.update(this.userId, { $set: {
      battle: {
        ready: true
      }
    } });
  },

  unSetReady: function() {
    Meteor.users.update(this.userId, { $set: {
      battle: {
        ready: false
      }
    } });
  }

});
