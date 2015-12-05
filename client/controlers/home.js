Template.home.events({
  "click #runWar": function(event, template){
    Session.set('isSearch', true);

    template.lookingForPlayers = Meteor.subscribe("lookingForPlayers", function() {
      console.log('On commence a chercher un ennemi');
      Modules.both.queries.lookForReadyPlayer.observe({
        added: ( item ) => {
            console.log('Nous avons trouvé un ennemi');
            Session.set('found', item._id);
        }
      });
    });
  },

  "click #cancelWar": function(event, template){
    Session.set('isSearch', false);

    // On se soustrait à la liste d'attente dans la salle d'attente
    template.lookingForPlayers.stop();
  },
});

Template.home.onCreated(function(){
  let self = this;

  /*racker.autorun(function(){
      self.lookingForPlayers.stop();
  });*/
});

Template.home.helpers({
  isSearching: function(){
    return Session.get('isSearch');
  }
});
