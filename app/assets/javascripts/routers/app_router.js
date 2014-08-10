Progressi.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "summary",
    "boards/new": "boardNew",
    "boards/:id": "boardShow",
    "tasks": "cardsIndex"
  },

  initialize: function(){
    Progressi.Collections.boards = new Progressi.Collections.Boards();
    Progressi.Collections.cards = new Progressi.Collections.Cards();
    this._boardsIndex();
  },

  _boardsIndex: function(){
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

  cardsIndex: function(){
    var router = this;
    var cards = Progressi.Collections.cards;
    cards.fetch({
      success: function(){
        var indexView = new Progressi.Views.CardsIndex({ collection: cards});
        router._swapContent(indexView);
      }
    })
  },

  boardShow: function(id){
    var router = this;
    var board = new Progressi.Models.Board({ id: id });
    board.fetch({
      success: function(){
        var showView = new Progressi.Views.BoardShow({ model: board });
        router._swapContent(showView);
        var members = new Progressi.Collections.Members({ board: board });
        members.fetch();  
        var membersView = new Progressi.Views.MembersIndex({ model: board, collection: members});
        router._swapMembers(membersView);
      }
    })
  },

  boardNew: function(){
    var board = new Progressi.Models.Board();
    var newView = new Progressi.Views.BoardNew({ model: board });
    this._swapContent(newView);
  },

  _swapContent: function (newContent) {
    this._currentContent && this._currentContent.remove();
    this._currentContent = newContent;
    $("#content").html(newContent.render().$el);
  },

  _swapMembers: function (newMembers) {
    this._currentMembers && this._currentMembers.remove();
    this._currentMembers = newMembers;
    $("#members").html(newMembers.render().$el);
  }
})