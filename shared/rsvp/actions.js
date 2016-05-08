const dispatch = require('pico-flux').dispatch;

const Actions = {

	getForm: (name) => {
		dispatch('GET_FORM', name);
	},

	saveForm: (data) => {
		dispatch('SAVE_FORM', data);
	},

};

module.exports = Actions;
