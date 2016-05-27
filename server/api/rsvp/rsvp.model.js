'use strict';

const db = require('../db.js');

const RSVPModel = db.sequelize.define('Rsvp', {
	email: {
		type: db.Sequelize.STRING,
		allowNull: false,
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
	classMethods: {
	},
});

module.exports = RSVPModel;
