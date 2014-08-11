Progressit.Models.Card = Backbone.Model.extend({
  urlRoot: 'api/cards',

  validate: function(attributes){
    if (!attributes || !attributes.title || attributes.title == ""){
      return "Title cannot be empty"
    }
  },
  
  items: function(){
    this._items = this._items || new Progressit.Collections.Items([], {card: this});
    return this._items;
  },

  formattedTime: function(attribute){
    var dateObj = new Date(this.get(attribute));
    return this._formatTime(dateObj);
  },

  start: function(){
    if (!this.get('start_time')){
      this.set({ start_time: new Date(Date.now()), status: "In Progress" });
    }
    this.set({recent_start: new Date(Date.now()) });
    this.save();
  },

  pause: function(){
    var runningTotal = this.get('actual_mins');
    runningTotal += (Date.now() - Date.parse(this.get('recent_start'))) / 60000;
    this.set({recent_start: null, actual_mins: runningTotal});
    this.save();
  },

  complete: function(){
    var card = this;
    if (this.get('recent_start')){
      this.pause();
    }
    this.set({completion_time: new Date(Date.now()), status: "Completed"});
    this.save();
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