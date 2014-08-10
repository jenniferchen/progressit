Progressi.Views.CardShow = Backbone.CompositeView.extend({
  template: JST['cards/show'],
  tagName: 'li',
  className: "card list-group-item",

  id: function(){ return "card-" + this.model.id },

  initialize: function(){
    this.listenTo(this.model, "sync", this.refresh.bind(this));
  },
  
  render: function(){
    var renderedContent = this.template({ card: this.model });
    this.$el.html(renderedContent);
    this.makeCardDroppable();
    return this;
  },

  refresh: function(){
    var renderedContent = this.template({ card: this.model });
    $("#card-" + this.model.id).html(renderedContent);
  },

  makeCardDroppable: function(){
    var view = this;
    this.$el.droppable({
      drop: function(event, ui){
        var id = ui.draggable.attr('id').match(/user-(\d+)/)[1];
        view.model.save({ user_id: id }, {
          success: function(){
            view.model.fetch();
          }
        })
      }
    });
  }
});