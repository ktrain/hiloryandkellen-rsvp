'use strict';

const _ = require('lodash');

module.exports = function RsvpError(data, name) {
	//Error.captureStackTrace(this, this.constructor);
	_.each(data, (val, key) => {
		this[key] = val;
	});
	if (name) {
		this.name = name;
	}
};

require('util').inherits(module.exports, Error);
