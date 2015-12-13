Meteor.startup(function(){
  Session.setDefault('found', false);
  Session.setDefault('isSearch', false);
  Session.setDefault('gameId', null);
});
