'use strict';

const config = require('browserify-stockpiler')({
	envPrefix: 'APP',
});
const db = require('../../db.js');

const RsvpModel = db.sequelize.define('Rsvp', {
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
	hooks: {
		beforeValidate: function() {
			if (!this.id) {
				this.id = this.invitationId;
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
