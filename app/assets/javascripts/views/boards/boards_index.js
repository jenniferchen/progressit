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
    this.$el.parent().siblings().find('li').removeClass("active");
    Backbone.history.navigate('boards/' + this.model.id, { trigger: true })
  }
})

Progressit.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST["boards/index"],

  events: {
    "click button": "newProject",
    "click .summary": "summary",
    "click .tasks": "tasks"
  },

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
  },

  newProject: function(event){
    event.preventDefault();
    this.$('button').addClass("hidden");
    var boardNewView = new Progressit.Views.BoardNew({ model: this.model, collection: this.collection });
    this.addSubview('.new-board', boardNewView);
  },

  summary: function(event){
    event.preventDefault();
    this.$('li').removeClass("active");
    this.$('.summary').addClass("active");
    Backbone.history.navigate('', { trigger: true })
  },

  tasks: function(event){
    event.preventDefault();
    this.$('li').removeClass("active");
    this.$('.tasks').addClass("active");
    Backbone.history.navigate('tasks', { trigger: true })
  }
})