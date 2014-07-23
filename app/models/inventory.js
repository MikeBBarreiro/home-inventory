'use strict';

function Item(name, room, dateAquired, count, cost){
  this.name = name;
  this.room = room;
  this.dateAquired = new Date(dateAquired);
  this.count = parseInt(count);
  this.cost = parseFloat(cost);
}

module.exports = Item;
