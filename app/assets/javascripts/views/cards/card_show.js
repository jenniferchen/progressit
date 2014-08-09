Progressi.Views.CardShow = Backbone.CompositeView.extend({
  template: JST['cards/show'],
  tagName: 'li',
  className: "card panel panel-default",

  id: function(){ return "card-" + this.model.id },
  
  render: function(){
    var renderedContent = this.template({ card: this.model });
    this.$el.html(renderedContent);
    return this;
  }
});