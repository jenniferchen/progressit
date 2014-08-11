Progressit.Views.BoardMembershipNew = Backbone.View.extend({
  template: JST['board_memberships/new'],

  events: {
    "submit form": 'new'
  },

  render: function(){
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
    return this;
  },

  new: function(event){
    event.preventDefault();
    var view = this;
    var formData = $(event.target).serializeJSON();
    var boardMembership = new Progressit.Models.BoardMembership({ board: this.model });
    boardMembership.save(formData, {
      success: function(){
        var newMember = new Progressit.Models.Member({ id: boardMembership.get('user_id') })
        newMember.fetch({ data: { board_id: view.model.id } });
        view.collection.add(newMember);
      }
    });
  }
});