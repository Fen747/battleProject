if(Meteor.isClient){
  Meteor.startup(function(){
    // Semble lever une erreur ?
    //BlazeLayout.setRootBody('body');
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
