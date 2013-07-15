App = Ember.Application.create();

App.ApplicationView = Ember.View.extend({
  templateName: 'application'
});

App.Router.map(function() {
  this.route("login", { path: "/" });

});
