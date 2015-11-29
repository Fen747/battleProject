Triggers = {};
Triggers.mustBe = {};
Triggers.mustNotBe = {};

Triggers.mustNotBe.loggedIn = () => {
  if (Meteor.loggingIn() || Meteor.userId()) {
    FlowRouter.go('/');
  }
};

Triggers.mustBe.loggedIn = () => {
  if (!(Meteor.loggingIn() || Meteor.userId())) {
    FlowRouter.go('/splash');
  }
}
