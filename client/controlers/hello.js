Template.hello.helpers({
  counter: function() {
    return Session.get('counter');
  }
});

Template.hello.events({
  "click button": function(event, template) {
    console.log("aaaaa");
    Session.set('counter', (Session.get("counter") + 1) );
  }
});
