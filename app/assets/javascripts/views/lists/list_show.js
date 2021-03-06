Progressit.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/show'],
  tagName: "li",
  className: "list",
  
  events: {
    "click .add-card": "renderNewCardView",
    "click .delete-list": "delete"
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
      var cardShowView = new Progressit.Views.CardShow({ model: card});
      this.addSubview('.cards', cardShowView);
    }
  },

  render: function(){
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);
    if (this.model.get('owned') == true){
      this.makeCardsSortable();
    }
    this.attachSubviews();
    return this;
  },

  renderNewCardView: function(){
    this.$('.add-card').addClass("hidden");
    var cardNewView = new Progressit.Views.CardNew({ model: this.model });
    this.swapSubview('.cards-new', cardNewView);
  },


  delete: function(){
    this.model.destroy();
    this.remove();
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