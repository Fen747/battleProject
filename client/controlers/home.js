Template.home.events({
  "click #runWar": function(event, template){
    Session.set('isSearch', true);

    Meteor.call('setReady', function(error, result) {
      console.log('test1');
      findWar(template);
    });
  },

  "click #cancelWar": function(event, template){
    Meteor.call('unSetReady');

    Session.set('isSearch', false);

    // On se soustrait à la liste d'attente dans la salle d'attente
    template.lookingForPlayers.stop();
  },
});

Template.home.onCreated(function(){
  let self = this;

  if (Session.get('isSearch'))
  {
    findWar(self);
  }
  /*Tracker.autorun(function(){
      self.lookingForPlayers.stop();
  });*/
});

Template.home.helpers({
  isSearching: function(){
    return Session.get('isSearch');
  }
});


findWar = function(template) {
  if (Meteor.userId()) {
    template.lookingForPlayers = Meteor.subscribe("lookingForPlayers", Meteor.userId(), function() {
      console.log('On commence a chercher un ennemi', Modules.both.queries.lookForReadyPlayer());
      Modules.both.queries.lookForReadyPlayer().observe({
        added: ( item ) => {
            console.log('Nous avons trouvé un ennemi');
            Session.set('found', item._id);
            Session.set('isSearch', false);
            Meteor.call('unSetReady');
            template.lookingForPlayers.stop();
            FlowRouter.go('/game');
        }
      });
    });
  }
};
