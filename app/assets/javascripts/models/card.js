TrelloClone.Models.Card = Backbone.Model.extend({
  urlRoot: 'api/cards',
  validate: function(attributes){
    if (!attributes || !attributes.title || attributes.title == ""){
      return "Title cannot be empty"
    }
  },
  items: function(){
    this._items = this._items || new TrelloClone.Collections.Items([], {card: this});
    return this._items;
  },
  parse: function(payload){
    if (payload.items){
      this.items.set(payload.items, { parse: true });
      delete payload.items;
    }
    return payload;
  }
});