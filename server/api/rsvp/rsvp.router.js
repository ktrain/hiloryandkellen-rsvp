'use strict';

const _ = require('lodash');

const RsvpError = require('../../error');

const InvitationModel = require('../invitation/invitation.model.js');
const RsvpModel = require('./rsvp.model.js');
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
			let data = req.body;
			if (!invitation.hasPlusOne) {
				data = _.omit(data, 'plusOne');
			}
			rsvp.set(data);
			rsvp.invitationId = id;
			return rsvp.save();
		}).then((rsvp) => {
			res.status(200).send({ rsvp: rsvp });
		}).catch((err) => {
			next(err);
		});
});

module.exports = RsvpRouter;
