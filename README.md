crel2
====

# What #

A fastest and simplest modification of crel https://github.com/KoryNunn/crel

This readme contains text from the crel readme.

A small, simple, and fast DOM creation utility.

# Why? #

Writing HTML is stupid. It's slow, messy, and should not be done in JavaScript.

The best way to make DOM elements is via document.createElement, but making lots of DOM with it is tedious.

crel.js makes the process easier.

Inspiration was taken from https://github.com/joestelmach/laconic, but crel wont screw with your bad in-DOM event listeners, and is smaller, faster, etc...

# Changes #

The difference with crel is more speed thanks to the use of arrays instead of objects and the loss of some utilities.

It's name is crel2 because crel code is not compatible with crel2, it requires some changes to work.

# Usage #

Signature:

	crel(tagName/dom element)
    crel(tagName/dom element, child1, child2, childN...)
    crel(tagName/dom element, attributes, child1, child2, childN...)
	
	Attributes is an array with pairs of "attribute - value" or "event - object/function"
	atributes => [attribute, value, attribute, value, event, object/function...]
	child => "string for textnode" | dom element/crel()

For browserify:

    npm i crel
    
    var crel = require('crel');
    
For standard script tag style:

    <script src="crel.min.js"></script>

To make some DOM:

Example:

    var element = crel('div', 
        crel('h1', 'Crello World!'),
        crel('p', 'This is crel'),
        crel('input', ['type', 'number'])
    )
    
    // Do something with 'element'
	
	Result:
	
	<div>
		<h1>Crello World!</h1>
		<p>This is crel</p>
		<input type="number"></input>
	</div>
    
You can create attributes with dashes, or reserved keywords, but using strings for the objects keys:

    crel('div', ['class', 'thing', 'data-attrubute', 'majigger']);
	
	Result:
	
	<div class="thing" data-attrubute="majigger"></div>
    
You can pass an already available element to crel, and it will be the target of the attributes/child elements

    crel(document.body, 
        crel('h1', 'Page title')
    )
	
	Result:
	
	<body>
		<h1>Page title</h1>
	</body>
    
You can assign child elements to variables during creation:

    var button,
        wrapper = crel('div',
            button = crel('button')
        );
	
	Result:
	
	<div>
		<button></button>
	</div>
	
You can assign events as attributes during creation:

    crel2('div', ['onclick', function(){
		alert('it works!')
	}], 'click me!');
	
	Result:
	
	<div>click me!</div>
	Launches the function when clicked

You can also object properties as attributes during creation:

	var test = crel2('div', ['arr', [1,2,3,4] ], 'this div has an array as attribute');
	
	console.log(test.arr.length);
	// 3

You could probably use crel to rearrange existing dom...

    crel(someDiv,
        crel(someOtherDiv, anotherOne)
    )
    
But don't.
    
# Goals #

## Easy to use ##

## Tiny ##
(easily less than 1K minified)
## Fast ##

crel is fast. Depending on what browser you use, it is up there with straight document.createElement calls.

crel: http://jsperf.com/dom-creation-libs/10

crel2: http://jsperf.com/dom-creation-libs/24

# License #

MIT
