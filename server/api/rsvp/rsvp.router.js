'use strict';

const RsvpModel = require('./rsvp.model.js');
const RsvpRouter = require('express').Router();

RsvpRouter.get('/:id', (req, res) => {
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
		});
});

RsvpRouter.post('/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);
	const rsvpData = _.extend({
		invitationId: id,
	}, req.body);

	RsvpModel.upsert(rsvpData)
		.then((rsvp) => {
			res.status(200).send({ rsvp: rsvp });
		});
});

module.exports = RsvpRouter;
