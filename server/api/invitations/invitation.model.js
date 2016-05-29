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
			const formattedName = _.chain(name)
				.words()
				.map((word) => {
					return _.capitalize(word);
				})
				.value()
				.join(' ');
			console.info(`formatted name: "${formattedName}"`);
			return InvitationModel.find({
				where: {
					guests: {
						'$contains': formattedName,
					},
				},
			});
		},
	},
});

module.exports = InvitationModel;
