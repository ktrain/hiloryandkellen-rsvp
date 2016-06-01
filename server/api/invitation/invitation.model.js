'use strict';

const _ = require('lodash');
const config = require('browserify-stockpiler')({
	envPrefix: 'APP',
});
const db = require('../../db');

const InvitationModel = db.sequelize.define('Invitation', {
	guests: {
		type: db.Sequelize.JSONB,
		allowNull: false,
		defaultValue: [],
	},
	hasPlusOne: {
		type: db.Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
	events: {
		type: db.Sequelize.JSONB,
		allowNull: false,
		defaultValue: [],
	}
}, {
	schema: config.db.schema,
	classMethods: {
		findInvitationByName: (name) => {
			return InvitationModel.find({
				where: [ `LOWER("guests"::text) LIKE '%${name.toLowerCase()}%'` ],
			});
		},
	},
});

module.exports = InvitationModel;
