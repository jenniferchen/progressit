Progressit.Models.BoardMembership = Backbone.Model.extend({
  initialize: function(options){
    this.board = options.board;
    this.urlRoot = 'api/boards/' + this.board.id + '/board_memberships';
  },
});