Progressi.Collections.Members = Backbone.Collection.extend({
  model: Progressi.Models.Member,
  initialize: function(options){
    this.board = options.board;
    this.url = 'api/boards/' + this.board.id + '/users';
  }
});