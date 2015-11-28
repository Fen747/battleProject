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
LoggedInRoutes.route('/game', {
  name: 'game',
  action: function() {
    BlazeLayout.render('layout', {
      main: 'game'
    });
  }
});

Accounts.onLogin(function(){
  FlowRouter.go('/');
});
