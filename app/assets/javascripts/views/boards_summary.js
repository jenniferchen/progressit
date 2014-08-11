Progressit.Views.BoardsSummary = Backbone.CompositeView.extend({
  template: JST["boards_summary"],

  initialize: function(){
    this.listenTo(this.collection, "sync", this.render.bind(this)); 
  },
  
  render: function(){
    var view = this;
    var renderedContent = this.template({ boards: this.collection });
    this.$el.html(renderedContent);
    return this;
  }
})