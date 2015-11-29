_Pos = new Mongo.Collection("position");
_Pos.allow({ 
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
