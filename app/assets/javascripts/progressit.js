window.Progressit = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Progressit.Routers.AppRouter();
    Backbone.history.start();
  }
};