'use strict';

var cItem = global.mongodb.collection('items');
var _ = require('lodash');

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

//finds the items and you mus convert to an array //

Item.find = function(query, cb){
  cItem.find(query).toArray(function(err, items){
    cb(items);
  });
};

Item.prototype.value = function(){
  return this.cost * this.count;
};

Item.value = function(query, cb){
    cItem.find(query).toArray(function(err, items){
      var val = 0;
      for(var i = 0; i < items.length; i++){
        var item = items[i];
        item = _.create(Item.prototype, item);
        val += item.value(); //item.cost * items.count;
      }

      cb(val);
 });
};
module.exports = Item;
