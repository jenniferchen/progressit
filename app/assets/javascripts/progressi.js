window.Progressi = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Progressi.Routers.AppRouter();
    Backbone.history.start();
  }
};