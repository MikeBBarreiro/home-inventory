/* global describe, it*/

'use strict';

var expect = require('chai').expect;
var Item = require('../../app/models/inventory');


describe('Item', function(){
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
});
