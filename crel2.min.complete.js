this.crel2 = (function(a){

	var f = function() {
		var args = arguments,
			element = args[0],
			argumentsLength = args.length;

		element = typeof element === 'string' ? a.createElement(element) : element;

		if (argumentsLength === 1) {
			return element;
		}

		var settings_child = args[1],
			childIndex = 2;

		if (settings_child instanceof Array) {
			var s = settings_child.length, action;
			while (s) {
				action = settings_child[--s];
				switch(settings_child[--s]){
					case "class":
						element.className = action;
					break;
					default:
						element[settings_child[s]] = action;
					break;
					case "for":
						element.htmlFor = action;
					break;
				}
			}
		} else {
			--childIndex;
		}

		while (argumentsLength > childIndex) {
			settings_child = args[childIndex++];
			if (typeof settings_child !== 'object') {
				settings_child = a.createTextNode(settings_child);
			}
			element.appendChild(settings_child);
		}

		return element;
	}

	return f;
})(window.document);
