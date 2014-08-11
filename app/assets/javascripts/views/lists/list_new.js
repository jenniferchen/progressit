Progressit.Views.ListNew = Backbone.View.extend({
  template: JST['lists/new'],

  events: {
    "submit form#create-list": 'newList'
  },

  render: function(){
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
    return this;
  },

  newList: function(event){
    event.preventDefault();
    var view = this;
    var formData = $(event.target).serializeJSON();
    var list = new Progressit.Models.List(formData["list"]);
    list.save({}, {
      success: function(){
        view.model.lists().add(list);
        view.render();
      }
    });
  }
});