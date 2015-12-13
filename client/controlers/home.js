Template.home.events({
  "click #runWar": function(event, template){
    Session.set('isSearch', true);

    Meteor.call('setReady', function() {
      Modules.client.Game.socket.emit('findWar', Meteor.userId());
    });
  },

  "click #cancelWar": function(event, template){
    Meteor.call('unSetReady');

    Session.set('isSearch', false);
  },
});

Template.home.onCreated(function(){
  let self = this;

  Modules.client.Game.socket = io('http://192.168.1.22:2000');

  Modules.client.Game.socket.on('joinGame', function(gameId) {
      // La connexion au serveur de jeu est êdu, on relance le jeu coté client
      Session.set('gameId', gameId);
      location.href='/game';
  });
});

Template.home.helpers({
  isSearching: function(){
    return Session.get('isSearch');
  }
});

Template.home.onRendered(function(){

});
