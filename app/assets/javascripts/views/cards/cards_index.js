Progressit.Views.CardsIndex = Backbone.CompositeView.extend({
  template: JST["cards/index"],
  events: {
  },

  initialize: function(){
    var view = this;
    this.listenTo(this.collection, "change", this.render);
    this.collection.each(function(card){
      var cardView = new Progressit.Views.CardShow({ model: card });
      view.addSubview(".cards", cardView);
    })
  },

  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
})