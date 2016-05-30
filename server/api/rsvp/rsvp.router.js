'use strict';

const _ = require('lodash');

const RsvpModel = require('./rsvp.model.js');
const RsvpRouter = require('express').Router();

RsvpRouter.get('/:id', (req, res, next) => {
	const id = parseInt(req.params.id, 10);
	RsvpModel.findById(id)
		.then((rsvp) => {
			if (!rsvp) {
				res.status(404).send({
					message: 'No RSVP exists for that invitation ID.',
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
	const rsvpData = _.extend({
		invitationId: id,
	}, req.body);

	RsvpModel.upsert(rsvpData)
		.then((created) => {
			return RsvpModel.findOne({
				where: {
					invitationId: id,
				},
			})
		}).then((rsvp) => {
			res.status(200).send({ rsvp: rsvp });
		}) .catch((err) => {
			next(err);
		});
});

module.exports = RsvpRouter;
