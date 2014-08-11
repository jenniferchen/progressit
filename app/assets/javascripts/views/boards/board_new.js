Progressit.Views.BoardNew = Backbone.View.extend({
  template: JST['boards/new'],

  events: {
    "submit form#create-board": 'new'
  },

  render: function(){
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
    return this;
  },

  new: function(event){
    event.preventDefault();
    var formData = $(event.target).serializeJSON();
    var board = new Progressit.Models.Board(formData["board"]);
    board.save({}, {
      success: function(){
        Progressit.Collections.boards.add(board);
        Backbone.history.navigate('', { trigger: true });
      }
    });
  }
});