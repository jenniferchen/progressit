Progressi.Models.Card = Backbone.Model.extend({
  urlRoot: 'api/cards',

  validate: function(attributes){
    if (!attributes || !attributes.title || attributes.title == ""){
      return "Title cannot be empty"
    }
  },
  
  items: function(){
    this._items = this._items || new Progressi.Collections.Items([], {card: this});
    return this._items;
  },

  formattedTime: function(attribute){
    var dateObj = new Date(this.get(attribute));
    return this._formatTime(dateObj);
  },

  _formatTime: function(dateObj){
    var dNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var dayOfWeek = dateObj.getUTCDay();
    var mon = dateObj.getUTCMonth();
    var day = dateObj.getUTCDate();
    var yr = dateObj.getUTCFullYear();
    var hr = dateObj.getUTCHours();
    var min = dateObj.getUTCMinutes();
    var ampm;

    if (hr > 12) {
      ampm = "PM";
      hr -= 12;
    } else {
      ampm = "AM"
    }

    if (min === 0) {
      min = "00";
    }

    return dNames[dayOfWeek] + ", " + mon + "/" + day + "/" + yr + ", " + hr + ":" + min + ampm;
  }
});