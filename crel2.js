//Copyright (C) 2012 Kory Nunn

//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/*

	This code is not formatted for readability, but rather run-speed and to assist compilers.

	However, the code's intention should be transparent.

	*** IE SUPPORT ***

	If you require this library to work in IE7, add the following after declaring crel.

	var testDiv = document.createElement('div'),
		testLabel = document.createElement('label');

	testDiv.setAttribute('class', 'a');
	testDiv['className'] !== 'a' ? crel.attrMap['class'] = 'className':undefined;
	testDiv.setAttribute('name','a');
	testDiv['name'] !== 'a' ? crel.attrMap['name'] = function(element, value){
		element.id = value;
	}:undefined;


	testLabel.setAttribute('for', 'a');
	testLabel['htmlFor'] !== 'a' ? crel.attrMap['for'] = 'htmlFor':undefined;



*/

(function (root, factory) {
	if (typeof exports === 'object') {
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		define(factory);
	} else {
		root.crel2 = factory();
	}
}(this, function () {
	var appendChild = function(element, child) {
		if(typeof child === 'string'){
			child = document.createTextNode(child);
		}
		element.appendChild(child);
	};


	function crel2(){
		var document = window.document,
			args = arguments, //Note: assigned to a variable to assist compilers. Saves about 40 bytes in closure compiler. Has negligable effect on performance.
			element = args[0],
			child,
			settings = args[1],
			childIndex = 2,
			argumentsLength = args.length;

		element = typeof element === 'string' ? document.createElement(element) : element;
		// shortcut
		if(argumentsLength === 1){
			return element;
		}

		if(typeof settings !== 'object' || typeof settings === 'string') {
			--childIndex;
			settings = false;
		}

		// shortcut if there is only one child that is a string
		if((argumentsLength - childIndex) === 1 && typeof args[childIndex] === 'string' && element.textContent !== undefined){
			element.textContent = args[childIndex];
		}else{
			while(childIndex < argumentsLength){
				child = args[childIndex];

				if(child == null){
					continue;
				}

				if (child instanceof Array) {
					var i = 0;
					while (i < child.length) {
						appendChild(element, child[i++]);
					}
				} else {
					appendChild(element, child);
				}
				childIndex++;
			}
		}

		if(settings !== false){
			var i = 0, key;
			while(i < settings.length){
				key = settings[i++];
				element.setAttribute(key, settings[i++]);
			}
		}

		return element;
	}

	return crel2;
}));
