Progressit.Views.Summary = Backbone.CompositeView.extend({
  template: JST['charts/summary'],

  initialize: function(){
    this.listenTo(this.collection, "add", this.addBarChart);
    // this.listenTo(this.collection, "add", this.draw);

    this.collection.each(this.addBarChart.bind(this));
  },

  addBarChart: function(board, index){
    var barChartView = new Progressit.Views.BarChart({ model: board });
    this.addSubview(".charts", barChartView);
  },

  addPieChart: function(board, index){
    var pieChartView = new Progressit.Views.PieChart({ model: board });
    this.addSubview(".charts", pieChartView);
  },

  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  },

  draw: function(){
    this.subviews('.charts').forEach(function(subview) {
      debugger
      subview.draw(); 
    });
  }
})