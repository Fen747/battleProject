GamesList = new Mongo.Collection("gameslist");
GamesList.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});
