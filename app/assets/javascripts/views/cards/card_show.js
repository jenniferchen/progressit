Progressi.Views.CardShow = Backbone.CompositeView.extend({
  template: JST['cards/show'],
  tagName: 'li',
  className: "card list-group-item",

  id: function(){ return "card-" + this.model.id },
  
  render: function(){
    var renderedContent = this.template({ card: this.model });
    this.$el.html(renderedContent);
    this.makeCardDroppable();
    return this;
  },

  makeCardDroppable: function(){
    var view = this;
    this.$el.droppable({
      drop: function(event, ui){
        $droppedEl = ui.draggable;
        debugger
      }
    });
  }
});