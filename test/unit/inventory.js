/* jshint expr:true */
/* global describe, it, before */

'use strict';

var expect = require('chai').expect;
var connect = require('../../app/lib/mongodb');
var Item;

describe('Item', function(){
  before(function(done){
    connect('home-inventory-test', function(){
      Item = require('../../app/models/inventory');
      done();
    });
  });



  describe('Constructor', function(){
    it('Should create a new item', function(){
      var item = new Item('sofa', 'livingroom', 'june 4th 2003', 1, 2500);
        expect(item.name).to.equal('sofa');
        expect(item.room).to.equal('livingroom');
        expect(item.dateAquired).to.be.instanceof(Date);
        expect(item.count).to.equal(1);
        expect(item.cost).to.equal(2500);
    });
  });

  describe('#save', function(){
    it('Should save an item to the mongo database', function(done){
      var item = new Item('sofa', 'livingroom', 'june 4th 2003', 1, 2500);
      item.save(function() {
        expect(item._id).to.be.ok;
        done();
      });
    });
  });
});

