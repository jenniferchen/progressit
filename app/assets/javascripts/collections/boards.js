Progressi.Collections.Boards = Backbone.Collection.extend({
  model: Progressi.Models.Board,
  url: 'api/boards'
});

Progressi.Collections.boards = new Progressi.Collections.Boards();