Progressit.Views.CardDetail = Backbone.CompositeView.extend({
  template: JST['cards/detail'],
  tagName: "div",
  className: "modal fade",
  
  id: function(){ return "target-" + this.model.id },

  initialize: function(){
    this.$el.on('hidden.bs.modal', this.remove.bind(this));
  },

  render: function(){
    var renderedContent = this.template({ card: this.model });
    this.$el.html(renderedContent);
    return this;
  }
});