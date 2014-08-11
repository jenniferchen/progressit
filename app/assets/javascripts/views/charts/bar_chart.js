Progressit.Views.BarChart = Backbone.CompositeView.extend({
  template: JST['charts/summary'],
  events: {
  },

  initialize: function(){
  },

  render: function(){
    var data = this.model.barChartData();
    debugger
    return this;
  }
})