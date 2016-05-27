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
			guests: [
				{
					name: 'Amazing Guest',
				},
				{
					name: 'Incredible Guest',
				},
				{
					name: 'Unparalleled Guest',
				},
			],
			hasPlusOne: true,
			events: [
				'Rehearsal Dinner',
				'Wedding',
				'Brunch',
			],
		},
	},
	answers: {
		'status': getDefaultStatus(),
		data: {
			email: '',
			guests: [
				{
					name: 'Amazing Guest',
					isAttending: {},
					dietaryRestrictions: '',
				},
				{
					name: 'Incredible Guest',
					isAttending: {},
					dietaryRestrictions: '',
				},
				{
					name: 'Unparalleled Guest',
					isAttending: {},
					dietaryRestrictions: '',
				},
			],
			plusOne: {
				name: '',
				dietaryRestrictions: '',
			},
			musicRequests: '',
			message: '',
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
		console.log(payload);
		return false;
	},

	SAVE_ANSWERS: function(payload) {
	},

}, {

	getForm: function() {
		return Store.form;
	},

	getAnswers: function() {
		return Store.answers;
	},

});
