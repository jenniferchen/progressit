Progressi.Views.CardNew = Backbone.View.extend({
  template: JST['cards/new'],

  events: {
    "submit form#create-card": "newCard"
  },

  render: function(){
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);
    return this;
  },

  newCard: function(event){
    event.preventDefault();
    var view = this;
    var formData = $(event.target).serializeJSON();
    var card = new Progressi.Models.Card(formData['card']);

    card.on("invalid", function(model, error){
      var errorMsg = $("<div>");
      errorMsg.addClass("alert alert-danger top-buffer");
      errorMsg.html(error);
      view.$el.find(".message").append(errorMsg);
    })

    card.save({}, {
      success: function(){
        view.model.cards().add(card);
        view.remove();
        $('.glyphicon-plus').removeClass("invisible");
      }
    })
  }
});