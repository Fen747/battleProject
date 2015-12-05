Template.layout.events({
  "click #logout-button": function(event, template){
    Meteor.logout(function(){
          FlowRouter.go('/splash');
    });
  }
});

Template.layout.onCreated(function(){
  Meteor.subscribe("myself"); 
});
