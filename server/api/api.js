'use strict';

const router = require('express').Router();
const errorHandler = require('./error');

router.use('/invitation', (req, res, next) => {
	console.log('Routing in to invitation module ...');
	next();
}, require('./invitation/invitation.router.js'));

router.use('/rsvp', (req, res, next) => {
	console.log('Routing in to the rsvp module ...');
	next();
}, require('./rsvp/rsvp.router.js'));

router.use(errorHandler);

module.exports = router;
