Progressit.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  events: {
    "click .new-list": "renderListNew",
    "click .delete-board": "delete"
  },

  initialize: function(){
    var lists = this.model.lists();
    this.listenTo(lists, "add", this.addList);

    lists.each(this.addList.bind(this));
  },

  addList: function(list, index){
    var listView = new Progressit.Views.ListShow({ model: list});
    this.addSubview(".lists", listView);
  },

  render: function(){
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();
    this.$el.find(".lists").append("<li></li>");
    if (this.model.get('owned') == true){
      this.makeListsSortable();
    }
    return this;
  },

  delete: function(){
    this.model.destroy();
    Progressit.Collections.boards.remove(this.model);
    this.remove();
    Backbone.history.navigate('', { trigger: true });
  },

  makeListsSortable: function(){
    var view = this;
    var lists = this.$el.find(".lists")
    lists.sortable({
      connectWith: ".lists",
      placeholder: "panel panel-default",
      forcePlaceholderSize: true,
      tolerance: 'pointer',
      update: function (event, ui) {
        var data = lists.sortable('serialize');
        view.model.lists().updateOrd(data);
      }
    });
  },

  renderListNew: function(event){
    this.$('.new-list').addClass("hidden");
    var listNewView = new Progressit.Views.ListNew({ model: this.model });
    this.addSubview('.lists-new', listNewView);
  }
});