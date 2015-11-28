Triggers = {};
Triggers.mustBe = {};
Triggers.mustNotBe = {};

Triggers.mustNotBe.loggedIn = () => {
  if (Meteor.loggingIn() || Meteor.userId()) {
    console.log('redirection connexion');
    FlowRouter.go('/');
  }
};

Triggers.mustBe.loggedIn = () => {
  if (!(Meteor.loggingIn() || Meteor.userId())) {
    FlowRouter.go('/splash');
  }
}
