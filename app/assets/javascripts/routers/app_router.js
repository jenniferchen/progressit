Progressi.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "summary",
    "boards/new": "boardNew",
    "boards/:id": "boardShow"
  },

  initialize: function(){
    this.boardsIndex();
  },

  boardsIndex: function(){
    var boards = Progressi.Collections.boards;
    boards.fetch({
      success: function(){
        var indexView = new Progressi.Views.BoardsIndex({ collection: boards });
        $(".left-sidebar").html(indexView.render().$el);
      }
    });
  },

  summary: function(){

  },

  boardShow: function(id){
    var router = this;
    var board = new Progressi.Models.Board({ id: id });
    board.fetch({
      success: function(){
        var showView = new Progressi.Views.BoardShow({ model: board });
        router._swapContent(showView);
      }
    })
  },

  boardNew: function(){
    var board = new Progressi.Models.Board();
    var newView = new Progressi.Views.BoardNew({ model: board });
    $('#content').html(newView.render().$el);
  },

  _swapContent: function (newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    $("#content").html(newView.render().$el);
  }
})