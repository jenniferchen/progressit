Progressit.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "summary",
    "projects/new": "boardNew",
    "projects/:id": "boardShow",
    "tasks": "cardsIndex"
  },

  initialize: function(){
    Progressit.Collections.boards = new Progressit.Collections.Boards();
    Progressit.Collections.cards = new Progressit.Collections.Cards();
    this._boardsIndex();
    this._boardsSummary();
  },

  _boardsIndex: function(){
    Progressit.Collections.boards.fetch();
    var indexView = new Progressit.Views.BoardsIndex({ collection: Progressit.Collections.boards });
    $(".left-sidebar").html(indexView.render().$el);
  },

  summary: function(){
    Progressit.Collections.boards.fetch();
    var summaryView = new Progressit.Views.Summary({ collection: Progressit.Collections.boards })
    this._swapContent(summaryView);
    this._boardsSummary();
  },

  _tasksSummary: function(){
    Progressit.Collections.cards.fetch();
    var tasksSummaryView = new Progressit.Views.TasksSummary({ collection: Progressit.Collections.cards })
    this._swapRight(tasksSummaryView);
  },

  _boardsSummary: function(){
    Progressit.Collections.boards.fetch();
    var boardsSummaryView = new Progressit.Views.BoardsSummary({ collection: Progressit.Collections.boards })
    this._swapRight(boardsSummaryView);
  },

  cardsIndex: function(){
    Progressit.Collections.cards.fetch();
    var indexView = new Progressit.Views.CardsIndex({ collection: Progressit.Collections.cards });
    this._swapContent(indexView);
    this._tasksSummary();
  },

  boardShow: function(id){
    var router = this;
    var board = new Progressit.Models.Board({ id: id });
    board.fetch({
      success: function(){
        var showView = new Progressit.Views.BoardShow({ model: board });
        router._swapContent(showView);
        var members = new Progressit.Collections.Members({ board: board });
        members.fetch();  
        var membersView = new Progressit.Views.MembersIndex({ model: board, collection: members});
        router._swapRight(membersView);
      }
    })
  },

  boardNew: function(){
    var board = new Progressit.Models.Board();
    var newView = new Progressit.Views.BoardNew({ model: board });
    this._swapContent(newView);
  },

  _swapContent: function (newContent) {
    this._currentContent && this._currentContent.remove();
    this._currentContent = newContent;
    $("#content").html(newContent.render().$el);
  },

  _swapRight: function (newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    $("#right-panel").html(newView.render().$el);
  }
})