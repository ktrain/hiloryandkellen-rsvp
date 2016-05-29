'use strict';

const router = require('express').Router();

const InvitationModel = require('./invitation.model.js');

router.get('/:name', (req, res) => {
	InvitationModel.findInvitationByName(req.params.name)
		.then((invitation) => {
			if (!invitation) {
				res.status(404).send({ message: 'Could not find an invitation with that name.' });
				return;
			}
			res.status(200).send({ invitation: invitation });
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send({ error: err });
		});
});

module.exports = router;
