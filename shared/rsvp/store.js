const flux = require('pico-flux');
const ajax = require('superagent');

// data
const clientConfig = require('rsvp/clientConfig');

const getDefaultStatus = function() {
	return {
		busy: false,
		err: null,
	};
};

let Store = {
	form: {
		'status': getDefaultStatus(),
		data: {
			email: 'amazingGuest@isp.net',
			guests: [
				{
					name: 'Amazing Guest',
					isAttending: false,
					dietaryRestrictions: '',
				},
				{
					name: 'Incredible Guest',
					isAttending: false,
					dietaryRestrictions: '',
				},
				{
					name: 'Unparalleled Guest',
					isAttending: false,
					dietaryRestrictions: '',
				},
			],
			hasPlusOne: true,
			plusOneName: '',
			plusOneDietaryRestrictions: '',
			message: 'omgomgomgomgomg',
		},
	},
};

module.exports = flux.createStore({

	GET_FORM: function(name) {
		Store.form.status.busy = true;
		Store.form.status.err = null;

		ajax
			.get(`/api/form/${encodeURIComponent(name)}`)
			.end((err, res) => {
				Store.form.status.busy = false;
				if (err) {
					Store.form.status.err = err;
					Store.form.data = {};
				} else {
					Store.form.data = res.body;
				}
				this.emitChange();
			});
	},

	SAVE_FORM: function(payload) {
	},

}, {

	getForm: function() {
		return Store.form;
	},

});
