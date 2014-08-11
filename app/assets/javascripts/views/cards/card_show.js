Progressit.Views.CardShow = Backbone.CompositeView.extend({
  template: JST['cards/show'],
  tagName: 'li',
  className: "card list-group-item",

  events: {
    "click .start": "start",
    "click .pause": "pause",
    "click .complete": "complete",
    "click .delete": "delete"
  },

  id: function(){ return "card-" + this.model.id },

  initialize: function(){
    this.listenTo(this.model, "sync", this.render.bind(this));
  },
  
  render: function(){
    var renderedContent = this.template({ card: this.model });
    this.$el.html(renderedContent);
    if (this.model.get('status') == "Unassigned" && this.model.get('owned') == true){
      this.makeCardAssignmentDroppable();
    }
    return this;
  },

  start: function(){
    this.model.start();
  },

  pause: function(){
    this.model.pause();
  },

  complete: function(){
    this.model.complete();
  },

  delete: function(){
    this.model.destroy();
    this.remove();
  },

  makeCardAssignmentDroppable: function(){
    var view = this;
    this.$('.drop-area').droppable({
      accept: ".member",
      greedy: true,
      over: function(){
        view.$('.drop-area').addClass('invisible');
      },
      out: function(){
        view.$('.drop-area').removeClass('invisible');
      },
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