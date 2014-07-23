'use strict';

var cItem = global.mongodb.collection('items');

function Item(name, room, dateAquired, count, cost){
  this.name = name;
  this.room = room;
  this.dateAquired = new Date(dateAquired);
  this.count = parseInt(count);
  this.cost = parseFloat(cost);
}

Item.prototype.save = function(cb){
  cItem.save(this, function(err, obj){
    cb();
  });
};

module.exports = Item;
