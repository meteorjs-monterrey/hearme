Meteor.startup(function () {  
  Messages._ensureIndex({ "userId": 1});
  Messages._ensureIndex({ "sentOn": -1});
  Markers._ensureIndex({ "userId": 1});
});