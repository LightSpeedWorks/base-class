// vector-private-test.js
  'use strict';

  try {
    global.$debug = true;
    global.$print = require('./print');
  } catch (e) {}

  var constructors = require('get-constructors');

  try {
    var BaseClass = require('../lib/base-class-extend');
  } catch (e) {
    console.log('cant require "../lib/base-class-extend": ' + e);
    var BaseClass = require('base-class-extend');
  }

  // sample: getter/setter Object.defineProperty (JavaScript) - SONICMOOV LAB (japanese)
  // http://lab.sonicmoov.com/development/javascript-object-defineproperty/

  var Vector2D = BaseClass.extend({
    new: function Vector2D(x, y) {
      var length = 0;
      var changed = true;
      x = Number(x) || 0;
      y = Number(y) || 0;
      this.private({
        get x()   { return x; },
        set x(xx) { x = xx; changed = true; },
        get y()   { return y; },
        set y(yy) { y = yy; changed = true; },
        get length() {
          if (changed) {
            length = Math.sqrt(x * x + y * y);
            changed = false;
          }
          return length;
        },
        set: function (xx, yy) { x = xx; y = yy; changed = true; },
      });
    },
  });

  var v2 = new Vector2D(3, 4);
  console.log('V2D(3, 4):', v2.length);
  v2.set(1, 2);
  console.log('V2D(1, 2):', v2.length);
  v2.set(1, 1);
  console.log('V2D(1, 1):', v2.length);

  var Vector3D = BaseClass.extend({
    new: function Vector3D(x, y, z) {
      var length = 0;
      var changed = true;
      x = Number(x) || 0;
      y = Number(y) || 0;
      z = Number(z) || 0;
      this.private({
        get x()   { return x; },
        set x(xx) { x = xx; changed = true; },
        get y()   { return y; },
        set y(yy) { y = yy; changed = true; },
        get z()   { return z; },
        set z(zz) { z = zz; changed = true; },
        get length() {
          if (changed) {
            length = Math.sqrt(x * x + y * y + z * z);
            changed = false;
          }
          return length;
        },
        set: function (xx, yy, zz) { x = xx; y = yy; z = zz; changed = true; },
      });
    },
  });

  var v3 = new Vector3D(3, 4, 5);
  console.log('V3D(3, 4, 5):', v3.length);

  console.log();
  function nm(elem) { return elem.name; }
  console.log(constructors(Vector2D).map(nm).join(' < '), ': Vector2D');
  console.log(constructors(v2      ).map(nm).join(' < '), ': v2');
  console.log(constructors(Vector3D).map(nm).join(' < '), ': Vector3D');
  console.log(constructors(v3      ).map(nm).join(' < '), ': v3');
