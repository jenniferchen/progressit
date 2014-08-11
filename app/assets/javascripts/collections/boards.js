Progressit.Collections.Boards = Backbone.Collection.extend({
  model: Progressit.Models.Board,
  url: 'api/boards',

  totalEstimated: function(){
    return this.inject(function(sum, board){ return sum + board.get('total_estimated'); }, 0)
  },

  totalCompleted: function(){
    return this.inject(function(sum, board){ return sum + board.get('total_completed'); }, 0)
  }
});