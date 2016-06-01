'use strict';

const config = require('browserify-stockpiler')({
	envPrefix: 'APP',
});
const db = require('../../db.js');

const RsvpModel = db.sequelize.define('Rsvp', {
	email: {
		type: db.Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: true,
		},
	},
	guests: {
		type: db.Sequelize.JSONB,
		allowNull: false,
		defaultValue: [],
	},
	plusOne: {
		type: db.Sequelize.JSONB,
		defaultValue: {},
	},
	musicRequests: {
		type: db.Sequelize.STRING,
	},
	message: {
		type: db.Sequelize.STRING,
	},
}, {
	schema: config.db.schema,
	hooks: {
		beforeValidate: (rsvp) => {
			if (!rsvp.id) {
				rsvp.id = rsvp.invitationId;
			}
		},
	},
	classMethods: {
	},
});

RsvpModel.belongsTo(db.sequelize.models.Invitation, {
	foreignKey: 'invitationId',
});

module.exports = RsvpModel;
