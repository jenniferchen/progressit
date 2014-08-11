Progressit.Views.Member = Backbone.View.extend({
  template: JST["members/member"],
  tagName: "li",
  className: "member",

  id: function(){ return "user-" + this.model.id },

  initialize: function(){
    this.listenTo(this.model, "sync", this.render.bind(this)); 
  },

  render: function(){
    var renderedContent = this.template({ member: this.model });
    this.$el.html(renderedContent);
    return this;
  }
})

Progressit.Views.MembersIndex = Backbone.CompositeView.extend({
  template: JST["members/index"],

  events: {
    "click button": "newBoardMembership"
  },

  initialize: function(){
    this.listenTo(this.collection, "sync add", this.render.bind(this)); 
  },
  
  render: function(){
    var view = this;
    var renderedContent = this.template({ board: this.model, members: this.collection });
    this.$el.html(renderedContent);
    this.collection.each(function(member){
      var memberView = new Progressit.Views.Member({ model: member });
      view.$('.members-list').append(memberView.render().$el);
    })
    if (this.model.get('owned') === true){
      this.makeMembersDraggable();
    }
    return this;
  },

  newBoardMembership: function(event){
    event.preventDefault();
    this.$('button').addClass("hidden");
    var newBoardMembershipView = new Progressit.Views.BoardMembershipNew({ model: this.model, collection: this.collection });
    this.addSubview('.new-board-membership', newBoardMembershipView);
  },

  makeMembersDraggable: function(){
    var view = this;
    var members = this.$el.find(".member")
    members.draggable({
      appendTo: 'body',
      containment: 'window',
      scroll: false,
      helper: 'clone'
    });
  }
})