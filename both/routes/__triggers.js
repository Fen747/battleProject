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
  console.log('Avant MustBeLog');
  if (!(Meteor.loggingIn() || Meteor.userId())) {
    console.log('Pendant MustBeLog');
    FlowRouter.go('/splash');
  }
}
