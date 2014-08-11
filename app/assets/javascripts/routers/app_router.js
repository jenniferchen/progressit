Progressit.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "summary",
    "boards/new": "boardNew",
    "boards/:id": "boardShow",
    "tasks": "cardsIndex"
  },

  initialize: function(){
    Progressit.Collections.boards = new Progressit.Collections.Boards();
    Progressit.Collections.cards = new Progressit.Collections.Cards();
    this._boardsIndex();
  },

  _boardsIndex: function(){
    var boards = Progressit.Collections.boards;
    boards.fetch({
      success: function(){
        var indexView = new Progressit.Views.BoardsIndex({ collection: boards });
        $(".left-sidebar").html(indexView.render().$el);
      }
    });
  },

  summary: function(){

  },

  cardsIndex: function(){
    var router = this;
    var cards = Progressit.Collections.cards;
    cards.fetch({
      success: function(){
        var indexView = new Progressit.Views.CardsIndex({ collection: cards});
        router._swapContent(indexView);
      }
    })
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
        router._swapMembers(membersView);
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

  _swapMembers: function (newMembers) {
    this._currentMembers && this._currentMembers.remove();
    this._currentMembers = newMembers;
    $("#members").html(newMembers.render().$el);
  }
})