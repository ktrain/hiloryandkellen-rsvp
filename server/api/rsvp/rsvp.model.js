'use strict';

const _ = require('lodash');
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
		set: function(val) {
			const invite = this.getInvitation();
			if (!invite.hasPlusOne) {
				return null;
			}
			return val;
		},
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
	instanceMethods: {
		toPayloadJSON: function() {
			const keysToOmit = [ 'createdAt', 'updatedAt' ];
			return _.omit(this.toJSON(), keysToOmit);
		},
		isSomeoneAttending: function() {
			return _.reduce(this.guests, (cur, guest) => {
				let guestIsAttendingAtLeastOneThing = _.some(_.values(guest.isAttending));
				return cur || guestIsAttendingAtLeastOneThing;
			}, false);
		},
	},
});

RsvpModel.belongsTo(db.sequelize.models.Invitation, {
	foreignKey: 'invitationId',
});

module.exports = RsvpModel;
