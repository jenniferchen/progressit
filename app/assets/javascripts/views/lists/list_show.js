Progressi.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/show'],
  tagName: "li",
  className: "list",
  
  events: {
    "click .glyphicon-plus": "renderNewCardView"
  },

  id: function(){ return "card-" + this.model.id },

  initialize: function(){
    var cards = this.model.cards();
    cards.each(this.addCard.bind(this));
    this.listenTo(cards, "add", this.addCard);
  },

  addCard: function(card){
    var idTag = "#card-" + card.id;
    if (this.$el.find(idTag).length == 0){
      var cardShowView = new Progressi.Views.CardShow({ model: card});
      this.addSubview('.cards', cardShowView);
    }
  },

  render: function(){
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);
    this.makeCardsSortable();
    this.attachSubviews();
    return this;
  },

  renderNewCardView: function(){
    this.$('.glyphicon-plus').addClass("invisible");
    var cardNewView = new Progressi.Views.CardNew({ model: this.model });
    this.swapSubview('.cards-new', cardNewView);
  },

  makeCardsSortable: function(){
    var view = this;
    var cards = this.$el.find(".cards")
    cards.sortable({
      connectWith: ".cards",
      placeholder: "list-group-item list-group-item-info",
      forcePlaceholderSize: true,
      update: function (event, ui) {
        var data = cards.sortable('serialize');
        view.model.cards().updateOrd(data);
      }
    });
  }
});