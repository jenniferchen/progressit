Progressit.Views.ListNew = Backbone.View.extend({
  template: JST['lists/new'],

  events: {
    "submit form#create-list": 'newList',
    "click .cancel": 'cancel'
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
        list.set({ owned: true });
        view.model.lists().add(list);
      }
    });
  },
  
  cancel: function(event){
    event.preventDefault();
    this.$el.parent().siblings().removeClass('hidden');
    this.remove();
  }
});