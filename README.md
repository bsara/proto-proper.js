
# proto-proper.js

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/bsara/proto.js/blob/master/LICENSE)

> A generic & helpful prototype object upon which new prototypes can be based.

`Proto` contains functions useful for prototype creation, manipulation,
inheritance, and for obtaining useful information about a prototype.



## Install

- **NPM:** `npm install --save proto-proper`
- **CDN - ES6:** `<script src="https://npmcdn.com/proto-proper@1.0.0-beta.0/dist/proto-proper.js"></script>`
- **CDN - ES5:** `<script src="https://npmcdn.com/proto-proper@1.0.0-beta.0/dist/proto-proper.es5.min.js"></script>`



## Usage

#### Creating a New Prototype

```javascript
let MyObject = Proto.newPrototype();

MyObject.init = function(options) { ... };
MyObject.func0 = function() { ... };
```


#### Inheritance From a Custom Prototype

```javascript
let MyObject = Proto.newPrototype();

MyObject.init = function(options) { ... };
MyObject.func0 = function() { ... };

let MyChildObject = MyObject.newPrototype();

MyChildObject.init = function(options) { ... };
```


#### Object Instantiation

```javascript
let obj = MyObject.new( ... );
```



## API Docs

### Proto

**Type:** `Object`

**Extends:** `Object.prototype`

A generic prototype upon which new prototypes can be based.

This object contains functions useful for prototype creation, manipulation,
inheritance, and for obtaining useful information about a prototype.


---


### Proto.newPrototype()

TODO: Add description

**Returns:** TODO: Add description

**Example Usage:**

```javascript
let Parent = Proto.newPrototype();
// add stuff to Parent

let Child  = Parent.newPrototype();
// add stuff to Child
```

---


### Proto.new([...arguments])

Creates a new instance of this prototype.

This function is to be called **instead of** using the `new` keyword.

Any arguments passed to this function will be used as the
arguments for the call made to the `init` function.

**Returns:** A newly created and initialized instance of this prototype.

**Example Usage:**

```javascript
let MyObject = Proto.newPrototype();
// add stuff to MyObject

let obj = MyObject.new();
```

---


### Proto.init([...arguments])

Initializes object.

This function is called whenever [`new()`](#protonewarguments) is called
and can be seen as the "constructor" of the prototype.

---


### Proto.instanceOf(proto)

A helper function to determine whether or not an object is a
prototype/instance of any given prototype (`proto`).

**Parameters:**

- **proto** [`Object`] - The prototype object being searched for in the
prototype chain.

**Returns:** `true` if the given `proto` is found in the prototype chain of
the object; otherwise, returns `false`.

**Example Usage:**

```javascript
let Parent = Proto.newPrototype();
let Child  = Parent.newPrototype();

let parentObj = Parent.new();
let childObj  = Child.new();

Parent.instanceOf(Object); // returns `false`
Child.instanceOf(Object);  // returns `false`

parentObj.instanceOf(Object); // returns `false`
childObj.instanceOf(Object);  // returns `false`

Parent.instanceOf(Parent);           // returns `true`
Parent.instanceOf(Proto);            // returns `true`
Parent.instanceOf(Object.prototype); // returns `true`

Child.instanceOf(Child);            // returns `true`
Child.instanceOf(Parent);           // returns `true`
Child.instanceOf(Proto);            // returns `true`
Child.instanceOf(Object.prototype); // returns `true`

parentObj.instanceOf(parentObj);        // returns `true`
parentObj.instanceOf(Parent);           // returns `true`
parentObj.instanceOf(Proto);            // returns `true`
parentObj.instanceOf(Object.prototype); // returns `true`

childObj.instanceOf(childObj);         // returns `true`
childObj.instanceOf(Child);            // returns `true`
childObj.instanceOf(Parent);           // returns `true`
childObj.instanceOf(Proto);            // returns `true`
childObj.instanceOf(Object.prototype); // returns `true`
```


<br/>
<br/>


# License

The MIT License (MIT)

Copyright (c) 2016 Brandon Sara (http://bsara.github.io/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
