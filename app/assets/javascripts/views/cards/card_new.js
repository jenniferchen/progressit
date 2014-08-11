Progressit.Views.CardNew = Backbone.View.extend({
  template: JST['cards/new'],

  events: {
    "submit form#create-card": "newCard",
    "click .cancel": 'cancel'
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
    formData['card']['due_time'] = formData['card']['due-date'] + "T" + formData['card']['due-date-time'];
    formData['card']['estimated_mins'] = formData['card']['estimated-time']*60;
    var card = new Progressit.Models.Card(formData['card']);
    card.on("invalid", function(model, error){
      var errorMsg = $("<div>");
      errorMsg.addClass("alert alert-danger top-buffer");
      errorMsg.html(error);
      view.$el.find(".message").append(errorMsg);
    })

    card.save({}, {
      success: function(newCard, response, options){
        newCard.set({status: "Unassigned", owned: true, assigned: false});
        view.model.cards().add(newCard);
        view.$el.siblings().removeClass("hidden");
        view.remove();
      }
    })
  },

  cancel: function(event){
    event.preventDefault();
    this.$el.siblings().removeClass('hidden');
    this.remove();
  }
});