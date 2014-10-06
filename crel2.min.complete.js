crel2 = (function(a){

	var f = function() {
		var args = arguments,
			element = args[0],
			argumentsLength = args.length;

		element = typeof element === 'string' ? a.createElement(element) : element;

		if (argumentsLength === 1) {
			return element;
		}

		var settings = args[1],
			childIndex = 2;

		if (settings instanceof Array) {
			var i = 0, s = settings.length, key, action, type;
			while (i < s) {
				key = settings[i++];
				type = typeof (action = settings[i++]);
				if (type === 'string' || type === 'number') {
					element.setAttribute(key, action);
				} else {
					element[key] = action;
				}
			}
		} else {
			--childIndex;
		}

		while (childIndex < argumentsLength) {
			var child = args[childIndex++];
			if (typeof child !== 'object') {
				child = a.createTextNode(child);
			}
			element.appendChild(child);
		}

		return element;
	}

	return f;
})(window.document);
