const dispatch = require('pico-flux').dispatch;

const Actions = {

	getForm: (name) => {
		dispatch('GET_FORM', name);
	},

	saveForm: (data) => {
		dispatch('SAVE_FORM', data);
	},

	saveAnswers: (data) => {
		display('SAVE_ANSWERS', data);
	},

};

module.exports = Actions;
