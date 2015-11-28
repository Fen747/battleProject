Template.name.onCreated(function() {

});

Template.name.onRendered(function() {

});

Template.hello.helpers({
  counter: function() {
    return Session.get('counter');
  }
});

Template.hellp.events({
  "click button": function(event, template) {
    Session.set('counter', Session.get("counter") + 1 );
  }
});
