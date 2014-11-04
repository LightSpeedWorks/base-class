// base-class-function-test.js
  'use strict';

  try {
    var BaseClass = require('../lib/base-class');
  } catch (e) {
    console.log('cant require "../lib/base-class": ' + e);
    var BaseClass = require('base-class-extend');
  }

  // Resolve dependencies
  var util = require('util');
  var getProto = Object.getPrototypeOf ? Object.getPrototypeOf :
                 function getProto(obj) { return obj.__proto__; };

  // BaseClass
  var b1 = new BaseClass();
  var b2 = BaseClass.new();
  var b3 = BaseClass();

  // Prepare
  Function.prototype.extend = BaseClass.extend;

  // CustomObject
  var CustomObject = Object.extend('CustomObject');
  var o1 = new CustomObject();
  var o2 = CustomObject.new();
  var o3 = CustomObject();

  // CustomArray
  var CustomArray = Array.extend('CustomArray');
  var a1 = new CustomArray(1, 2, 3);
  var a2 = CustomArray.new(1, 2, 3);
  var a3 = CustomArray(1, 2, 3);

  // CustomError
  var CustomError = Error.extend('CustomError');
  var e1 = new CustomError('message1');
  var e2 = CustomError.new('message2');
  var e3 = CustomError('message3');
  console.log('%s %s', e1, e1.message); //, e1.stack);
  console.log('%s %s', e2, e2.message); //, e2.stack);
  console.log('%s %s', e3, e3.message); //, e3.stack);

  var EventEmitter = require('events').EventEmitter;

  // CustomEventEmitter
  var CustomEventEmitter = EventEmitter.extend('CustomEventEmitter');
  var ee1 = new CustomEventEmitter();
  var ee2 = CustomEventEmitter.new();
  var ee3 = CustomEventEmitter();
  ee1.on('test', function () { console.log('ee1.test'); });
  ee2.on('test', function () { console.log('ee2.test'); });
  ee3.on('test', function () { console.log('ee3.test'); });
  ee1.emit('test');
  ee2.emit('test');
  ee3.emit('test');

  checkConstructor(BaseClass, Object, b1, b2, b3);
  checkConstructor(CustomObject, Object, o1, o2, o3);
  checkConstructor(CustomArray, Array, a1, a2, a3);
  checkConstructor(CustomError, Error, e1, e2, e3);
  checkConstructor(CustomEventEmitter, EventEmitter, ee1, ee2, ee3);

  function checkConstructor(ctor, superCtor) {
    var objs = Array.prototype.slice.call(arguments, 2);

    objs.forEach(function (obj) {
      var msgs = [util.format('%j %s %s %s', obj, JSON.stringify(obj), obj + '', {}.toString.apply(obj))];
      if (obj) msgs.push(obj.constructor.name);

      var parent = (obj && getProto(obj)) ? getProto(getProto(obj)) : null;
      if (parent) msgs.push(parent.constructor.name);

      console.log(msgs.join(' '));

      if (obj && obj.constructor !== ctor)
        throw new TypeError(obj.constructor.name + ' !== ' + ctor.name);
      if (parent && parent.constructor !== superCtor)
        throw new TypeError(parent.constructor.name + ' !== ' + superCtor.name);
    });
  }