/**
 * TODO: INSERT COPYRIGHT HERE
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
 * // Creating a new prototype
 *
 * let MyObject = Proto.newPrototype();
 *
 * MyObject.init = function(options) { ... };
 * MyObject.func0 = function() { ... };
 *
 *
 * @example
 * // Creating a new prototype from your custom prototype
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
 * // Creating a new instance of your custom prototype
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
   * This function is to be called insted of using the `new` keyword.
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
   * @returns {!Boolean} `true` if the given `proto` is found in the prototype
   *                     chain of this object; otherwise, returns `false`.
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
