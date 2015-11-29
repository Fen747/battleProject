Template.layout.events({
  "click #logout-button": function(event, template){
    Meteor.logout(function(){
          FlowRouter.go('/splash');
    });
  }
});
