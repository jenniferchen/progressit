Progressit.Views.TasksSummary = Backbone.CompositeView.extend({
  template: JST["tasks_summary"],

  initialize: function(){
    this.listenTo(this.collection, "sync", this.render.bind(this)); 
  },
  
  render: function(){
    var view = this;
    var renderedContent = this.template({ cards: this.collection });
    this.$el.html(renderedContent);
    return this;
  }
})