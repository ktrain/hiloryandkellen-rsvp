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
	invitation: {
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
	rsvp: {
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

	GET_INVITATION: function(name) {
		Store.invitation.status.busy = true;
		Store.invitation.status.err = null;

		ajax
			.get(`/api/invitations/${encodeURIComponent(name)}`)
			.end((err, res) => {
				Store.invitation.status.busy = false;
				if (err) {
					Store.invitation.status.err = err;
					Store.invitation.data = {};
				} else {
					Store.invitation.data = res.body.invitation;
				}
				this.emitChange();
			});
	},

	SAVE_INVITATION: function(payload) {
		console.log(payload);
		return false;
	},

	SAVE_RSVP: function(payload) {
	},

}, {

	getInvitation: function() {
		return Store.invitation;
	},

	getRsvp: function() {
		return Store.rsvp;
	},

});
