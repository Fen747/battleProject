Template.layout.events({
  "click button": function(event, template){
    Meteor.logout(function(){
          FlowRouter.go('/splash');
    });
  }
});
