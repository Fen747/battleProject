Routes.route('/splash', {
  name: 'splash',
  action: function() {
    BlazeLayout.render('splash');
  },
  triggersEnter: [
    Triggers.mustNotBe.loggedIn
  ]
});

LoggedInRoutes.route('/', {
  name: 'home',
  action: function() {
    BlazeLayout.render('layout', {
      main: 'home'
    });
  }
});

Accounts.onLogin(function(){
  FlowRouter.go('/');
});
