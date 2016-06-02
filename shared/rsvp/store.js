const flux = require('pico-flux');
const ajax = require('superagent');

// data
const clientConfig = require('rsvp/clientConfig');
const Actions = require('./actions');

const getDefaultStatus = function() {
	return {
		busy: false,
		code: null,
		err: null,
	};
};

let Store = {
	invitation: {
		status: getDefaultStatus(),
		data: null,
	},
	rsvp: {
		status: getDefaultStatus(),
		data: null,
	},
};

module.exports = flux.createStore({

	GET_INVITATION: function(name) {
		Store.invitation.status.busy = true;
		Store.invitation.status.code = null;
		Store.invitation.status.err = null;

		ajax
			.get(`/api/invitation/${encodeURIComponent(name)}`)
			.end((err, res) => {
				Store.invitation.status.busy = false;
				Store.invitation.status.code = res.status;
				if (err) {
					Store.invitation.status.err = err.response.body;
					Store.invitation.data = null;
				} else {
					Store.invitation.data = res.body.invitation;
					Actions.getRsvp();
				}
				this.emitChange();
			});
	},

	GET_RSVP: function(payload) {
		if (!Store.invitation.data.id) {
			Store.rsvp.status.busy = false;
			Store.rsvp.status.code = null;
			Store.rsvp.status.err = {
				message: 'You must have a valid invitation ID in order to fetch an existing RSVP.',
			};
			return true;
		}

		Store.rsvp.status.busy = true;
		Store.rsvp.status.code = null;
		Store.rsvp.status.err = null;

		ajax
			.get(`/api/rsvp/${Store.invitation.data.id}`)
			.end((err, res) => {
				Store.rsvp.status.busy = false;
				Store.rsvp.status.code = res.status;
				if (err) {
					console.error(err);
					// there's no rsvp for this invitation ID, so set up the data
					const invitation = Store.invitation.data;
					Store.rsvp.data = {
						email: '',
						guests: _.map(invitation.guests, (guest) => {
							return {
								name: guest,
								isAttending: {},
								dietaryRestrictions: '',
							};
						}),
						plusOne: {},
						musicRequests: '',
						message: '',
					};
				} else {
					Store.rsvp.data = res.body.rsvp;
				}
				//console.log('store rsvp data', Store.rsvp.data);
				this.emitChange();
			});
	},

	SAVE_RSVP: function(payload) {
		Store.rsvp.status.busy = true;
		Store.rsvp.status.err = null;

		ajax
			.post(`/api/rsvp/${Store.invitation.data.id}`)
			.send(payload)
			.end((err, res) => {
				Store.rsvp.status.busy = false;
				if (err) {
					console.error('err response body', err.response.body);
					Store.rsvp.status.err = err.response.body;
				} else {
					Store.rsvp.data = res.body.rsvp;
				}
				this.emitChange();
			});
	},

}, {

	getInvitation: function() {
		return Store.invitation;
	},

	getRsvp: function() {
		return Store.rsvp;
	},

});
