GameListDB = new Mongo.Collection("gameListDB");
GameListDB.allow({
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
