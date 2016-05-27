const dispatch = require('pico-flux').dispatch;

const Actions = {

	getInvitation: (name) => {
		dispatch('GET_INVITATION', name);
	},

	getRsvp: (id) => {
		dispatch('GET_RSVP', id);
	},

	saveRsvp: (data) => {
		dispatch('SAVE_RSVP', data);
	},

};

module.exports = Actions;
