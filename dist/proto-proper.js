/*!
 * proto-proper.js (1.0.0-beta.7)
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Brandon Sara (http://bsara.github.io/)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



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
let Proto = Object.create(Object.prototype);



Object.assign(Proto, {

  /**
   * TODO: Add description
   * @returns TODO: Add description
   */
  newPrototype() {
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
  new() {
    let newInstance = Object.create(this);

    newInstance.init(...arguments);

    return newInstance;
  },



  /**
   * Initializes object.
   *
   * This function is called whenever `new` is called and can be seen as
   * the "constructor" of the prototype.
   */
  init() {
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
  instanceOf(proto) {
    if (proto === this || proto === Proto || proto === Object.prototype) {
      return true;
    }

    let thisProto = Object.getPrototypeOf(this);

    if (thisProto == null) {
      return false;
    }

    return (thisProto === proto
              || (thisProto.instanceOf != null && thisProto.instanceOf(proto)));
  }
});



export default Proto;
