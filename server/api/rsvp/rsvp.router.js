'use strict';

const _ = require('lodash');

const Emailer = require('../../emailer');
const RsvpError = require('../../error');

const InvitationModel = require('../invitation/invitation.model.js');
const RsvpModel = require('./rsvp.model.js');
const RsvpModule = require('./rsvp.module.js');
const RsvpRouter = require('express').Router();

RsvpRouter.get('/:id', (req, res, next) => {
	const id = parseInt(req.params.id, 10);
	RsvpModel.findOne({
		where: {
			invitationId: id,
		}
	}).then((rsvp) => {
		if (!rsvp) {
			res.status(404).send({
				message: 'Invalid invitation ID.',
				invitationId: id,
			});
			return;
		}
		res.status(200).send({ rsvp: rsvp });
	})
	.catch((err) => {
		next(err);
	});
});

RsvpRouter.post('/:id', (req, res, next) => {
	const id = parseInt(req.params.id, 10);
	let invitation;

	InvitationModel.findById(id)
		.then((inv) => {
			invitation = inv;
			if (!invitation) {
				throw new RsvpError({
					message: 'Invalid invitation ID.',
					invitationId: id,
					status: 404,
				});
			}

			return RsvpModel.find({
				where: {
					invitationId: id,
				},
			});
		}).then((rsvp) => {
			if (!rsvp) {
				rsvp = RsvpModel.build();
			}
			const data = _.extend({}, req.body, {
				invitationId: id,
			});
			rsvp.set(data);
			return rsvp.save();
		}).then((rsvp) => {
			RsvpModule.sendConfirmationEmail(rsvp);
			return rsvp;
		}).then((rsvp) => {
			res.status(200).send({ rsvp: rsvp.toPayloadJSON() });
		}).catch((err) => {
			next(err);
		});
});

module.exports = RsvpRouter;
