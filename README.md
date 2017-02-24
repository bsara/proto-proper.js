
# proto-proper.js [![NPM Package](https://img.shields.io/npm/v/proto-proper.svg?style=flat-square)][npm]

[![ISC License](https://img.shields.io/badge/license-ISC-blue.svg?style=flat-square)][license]

> A generic & helpful prototype object upon which new prototypes can be based.

The `Proto` object provided by this library contains functions useful for
prototype creation, manipulation, inheritance, and the retrieval of useful
information about a prototype.

**Don't know much about prototypal based object-oriented programming or want to
understand it better?** [*Prototypal Object-Oriented Programming using
JavaScript*][article] by [Mehdi Maujood][article-author] is an excellent, short
article from [*A List Apart*][a-list-apart] which is a great starting point
for understanding prototypal based OOP and how it is/can be used in JavaScript.


**Library Sizes**

| Format                                              | Size     |
|:----------------------------------------------------|:---------|
| ES5 Minified ([`proto-proper.es5.min.js`][es5-min]) | ~0.9 kB  |
| ES5 Unminified ([`proto-proper.es5.js`][es5])       | ~5.5 kB  |
| ES6 Unminified ([`proto-proper.js`][es6])           | ~4.96 kB |



# Install

**NPM**
```shell
$ npm install --save proto-proper
```

**CDN (ES5)**
```html
<script src="//npmcdn.com/proto-proper@1.0.0/dist/proto-proper.es5.min.js"></script>
```

**CDN (ES6)**
```html
<script src="//npmcdn.com/proto-proper@1.0.0/dist/proto-proper.js"></script>
```



# Usage

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



# API Docs

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



# Building the Project

> The project is built using [Gulp.js](http://gulpjs.com/). To install Gulp.js,
refer to [the Gulp.js "Getting Started" docs](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md).

First, install all dependent node modules by running the following command at
the root of the project:

```sh
$ npm i
```

After you have installed all dependent NPM packages, run the following at the
root of the project for a list of available gulp tasks:

```sh
$ gulp help
```



# License

ISC License (ISC)

Copyright (c) 2017 Brandon Sara (http://bsara.github.io/)

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.






[license]: https://github.com/bsara/proto-proper.js/blob/master/LICENSE "License"
[npm]:     https://www.npmjs.com/package/proto-proper "NPM Package: proto-proper"

[a-list-apart]:   http://alistapart.com "A List Apart"
[article]:        http://alistapart.com/article/prototypal-object-oriented-programming-using-javascript "Prototypal Object Oriented Programming using Javascript"
[article-author]: http://alistapart.com/author/mehdi-maujood "A List Apart Author: Mehdi Maujood"

[es5]:     https://github.com/bsara/proto-proper.js/blob/master/dist/proto-proper.es5.js "proto-proper.es5.js"
[es5-min]: https://github.com/bsara/proto-proper.js/blob/master/dist/proto-proper.es5.min.js "proto-proper.es5.min.js"
[es6]:     https://github.com/bsara/proto-proper.js/blob/master/dist/proto-proper.js "proto-proper.js"
