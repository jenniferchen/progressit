Progressi.Models.Card = Backbone.Model.extend({
  urlRoot: 'api/cards',

  validate: function(attributes){
    if (!attributes || !attributes.title || attributes.title == ""){
      return "Title cannot be empty"
    }
  },
  
  items: function(){
    this._items = this._items || new Progressi.Collections.Items([], {card: this});
    return this._items;
  }
});