Progressit.Views.CardsIndex = Backbone.CompositeView.extend({
  template: JST["cards/index"],
  events: {
  },

  initialize: function(){
    var view = this;
    this.listenTo(this.collection, "sync add destroy", this.render);
  },

  render: function(){
    var view = this;
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.collection.each(function(card){
      var cardView = new Progressit.Views.CardShow({ model: card });
      view.addSubview(".cards", cardView);
    })
    return this;
  }
})