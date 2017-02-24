/**!
 * proto-proper.js (1.0.0)
 *
 * ISC License (ISC)
 *
 * Copyright (c) 2017 Brandon Sara (http://bsara.github.io/)
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
    return;
  }
  if (typeof exports === 'object') {
    module.exports = factory(require, exports, module);
    return;
  }
  root.Proto = factory(undefined, {}, undefined);
}(this, function(require, exports, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// eslint-disable-next-line spaced-comment

/**
 * A generic prototype upon which new prototypes can be based.
 *
 * This object contains functions useful for prototype creation, manipulation,
 * inheritance, and for obtaining useful information about a prototype.
 *
 * @type {Object}
 * @extends {Object.prototype}
 *
 *
 * @example
 * // Creating a New Prototype
 *
 * let MyObject = Proto.newPrototype();
 *
 * MyObject.init = function(options) { ... };
 * MyObject.func0 = function() { ... };
 *
 *
 * @example
 * // Inheritance From a Custom Prototype
 *
 * let MyObject = Proto.newPrototype();
 *
 * MyObject.init = function(options) { ... };
 * MyObject.func0 = function() { ... };
 *
 * let MyChildObject = MyObject.newPrototype();
 *
 * MyChildObject.init = function(options) { ... };
 *
 *
 * @example
 * // Object Instantiation
 * let obj = MyObject.new( ... );
 */
var Proto = Object.create(Object.prototype);

Object.assign(Proto, {

  /**
   * TODO: Add description
   * @returns TODO: Add description
   */
  newPrototype: function newPrototype() {
    return Object.create(this);
  },


  /**
   * Creates a new instance of this prototype.
   *
   * This function is to be called **instead of** using the `new` keyword.
   *
   * Any arguments passed to this function will be used as the
   * arguments for the call made to the `init` function.
   *
   * @example
   * let obj = MyObject.new();
   *
   * @returns A newly created and initialized instance of this prototype.
   */
  new: function _new() {
    var newInstance = Object.create(this);

    newInstance.init.apply(newInstance, arguments);

    return newInstance;
  },


  /**
   * Initializes object.
   *
   * This function is called whenever `new` is called and can be seen as
   * the "constructor" of the prototype.
   */
  init: function init() {
    // Intentionally doing nothing
  },


  /**
   * @param {Object} proto - TODO: Add description
   *
   * @example
   * let Parent = Proto.newPrototype();
   * let Child  = Parent.newPrototype();
   *
   * let parentObj = Parent.new();
   * let childObj  = Child.new();
   *
   * Parent.instanceOf(Object); // returns `false`
   * Child.instanceOf(Object);  // returns `false`
   *
   * parentObj.instanceOf(Object); // returns `false`
   * childObj.instanceOf(Object);  // returns `false`
   *
   * Parent.instanceOf(Parent);           // returns `true`
   * Parent.instanceOf(Proto);            // returns `true`
   * Parent.instanceOf(Object.prototype); // returns `true`
   *
   * Child.instanceOf(Child);            // returns `true`
   * Child.instanceOf(Parent);           // returns `true`
   * Child.instanceOf(Proto);            // returns `true`
   * Child.instanceOf(Object.prototype); // returns `true`
   *
   * parentObj.instanceOf(parentObj);        // returns `true`
   * parentObj.instanceOf(Parent);           // returns `true`
   * parentObj.instanceOf(Proto);            // returns `true`
   * parentObj.instanceOf(Object.prototype); // returns `true`
   *
   * childObj.instanceOf(childObj);         // returns `true`
   * childObj.instanceOf(Child);            // returns `true`
   * childObj.instanceOf(Parent);           // returns `true`
   * childObj.instanceOf(Proto);            // returns `true`
   * childObj.instanceOf(Object.prototype); // returns `true`
   *
   * @returns {Boolean} `true` if the given `proto` is found in the prototype
   *                    chain of this object; otherwise, returns `false`.
   */
  instanceOf: function instanceOf(proto) {
    if (proto === this || proto === Proto || proto === Object.prototype) {
      return true;
    }

    var thisProto = Object.getPrototypeOf(this);

    if (thisProto == null) {
      return false;
    }

    return thisProto === proto || thisProto.instanceOf != null && thisProto.instanceOf(proto);
  }
});

return exports.default = Proto;
}));

//# sourceMappingURL=proto-proper.es5.js.map
