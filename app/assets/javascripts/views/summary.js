Progressit.Views.SummaryItem = Backbone.View.extend({
  template: JST["summary_item"],

  render: function(){
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
    return this;
  }
})

Progressit.Views.Summary = Backbone.CompositeView.extend({
  template: JST["summary"],

  initialize: function(){
    this.listenTo(this.collection, "sync", this.render.bind(this)); 
  },
  
  render: function(){
    var view = this;
    var renderedContent = this.template({ boards: this.collection });
    this.$el.html(renderedContent);
    this.collection.each(function(board){
      var summaryItemView = new Progressit.Views.SummaryItem({ model: board });
      view.$el.find('.boards').append(summaryItemView.render().$el);
    })
    return this;
  }
})