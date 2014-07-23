/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect;
var connect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var Item;

describe('Item', function(){
  before(function(done){
    connect('home-inventory-test', function(){
      Item = require('../../app/models/inventory');
      done();
    });
  });

  beforeEach(function(done){
    global.mongodb.collection('items').remove(function(){
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
        expect(item._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('.find', function(){
    it('Should find all the items from the mongo database', function(done){
      var item = new Item('sofa', 'livingroom', 'june 4th 2003', 1, 2500);
      item.save(function(){
        Item.find({}, function(items){
          expect(items).to.have.length(1);
        done();
        });
      });
    });
    it('Should find one specific item', function(done){
      var chair = new Item('chair', 'den', 'may 24th 2003', 4, 75);
      var bed = new Item('bed', 'bedroom', 'july 15th 1990', 1, 600);
      var lazyboy = new Item('lazyboy', 'livingroom', 'july 22nd 2012', 2, 240);

      chair.save(function(){
        bed.save(function(){
          lazyboy.save(function(){
            Item.find({name:'lazyboy'}, function(items){
              expect(items).to.have.length(1);
              expect(items[0].name).to.equal('lazyboy');
              done();
            
            });
          });
        });
      });
    });
  });
  describe('.value', function(){
    it('Should return the value of a group of items', function(done){
      var lazyboy = new Item('lazyboy', 'livingroom', 'july 22nd 2012', 2, 240);
      var chair = new Item('chair', 'den', 'may 24th 2003', 4, 75);
      var bed = new Item('Bed', 'Bedroom', 'july 15th 1990', 2, 600);
        lazyboy.save(function(){
          chair.save(function(){
            bed.save(function(){
              Item.value({}, function (val){
                expect(val).to.equal(1980);
              done();
            });
          });
        });
      });
    });
  });
});

