Progressi.Collections.Lists = Backbone.Collection.extend({
  model: Progressi.Models.List,
  url: 'api/lists',
  comparator: 'ord',

  initialize: function(models, options){
    this.board = options.board;
  },
  
  updateOrd: function(data){
    var collection = this;
    var ids = data.split("&").map(function(id){ return id.match(/=(\d+)/)[1]});
    ids.forEach(function(id, idx){
      var model = collection.get(id);
      model.save({'ord': idx});
    });
  }
});