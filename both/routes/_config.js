if(Meteor.isClient){
  Meteor.startup(function(){
    BlazeLayout.setRoot('body');
  });
}

Routes = FlowRouter.group({
  name : 'routes',
  triggersEnter: [

  ]
});

LoggedInRoutes = Routes.group({
  name : 'loggedIn',
  triggersEnter: [
    Triggers.mustBe.loggedIn
  ]
});
