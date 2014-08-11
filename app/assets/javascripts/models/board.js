Progressit.Models.Board = Backbone.Model.extend({
  urlRoot: 'api/boards',
  
  lists: function(){
    this._lists = this._lists || new Progressit.Collections.Lists([], { board: this });
    return this._lists;
  },

  parse: function(payload){
    if (payload.lists){
      this.lists().set(payload.lists, { parse: true });
      delete payload.lists;
    }
    return payload;
  },

  completionPercent: function(){
    if (this.get('total_estimated') && this.get('total_estimated') !== 0) {
      return (this.get('total_completed') / this.get('total_estimated') * 100).toFixed();
    } else {
      return 0;
    }
  }
});