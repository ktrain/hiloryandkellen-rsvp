const flux = require('pico-flux');
const ajax = require('superagent');

// data
const clientConfig = require('rsvp/clientConfig');

const getDefaultStatus = function() {
	return {
		working: false,
		err: null,
	};
};

let Store = {
	form: {
		'status': getDefaultStatus(),
	},
	rsvp: {
		'status': getDefaultStatus(),
	},
};

module.exports = flux.createStore({

	GET_FORM: function(payload) {
	},

	GET_RSVP: function(payload) {
	},

	SAVE_SVP: function(payload) {
	},

}, {

	getForm: function() {
		return Store.form;
	},

	getRsvp: function() {
		return Store.rsvp;
	},

});
