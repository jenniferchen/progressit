Progressit.Views.Board = Backbone.View.extend({
  template: JST["boards/board"],
  tagName: "li",
  events: {
    "click": "showBoard"
  },

  render: function(){
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
    return this;
  },

  showBoard: function(event){
    event.preventDefault();
    this.$el.addClass("active");
    this.$el.siblings().removeClass("active");
    Backbone.history.navigate('boards/' + this.model.id, { trigger: true })
  }
})

Progressit.Views.BoardsIndex = Backbone.View.extend({
  template: JST["boards/index"],

  initialize: function(){
    this.listenTo(this.collection, "sync", this.render.bind(this)); 
  },
  
  render: function(){
    var view = this;
    var renderedContent = this.template({ boards: this.collection });
    this.$el.html(renderedContent);
    this.collection.each(function(board){
      var boardView = new Progressit.Views.Board({ model: board });
      view.$el.find('.boards').append(boardView.render().$el);
    })
    return this;
  }
})