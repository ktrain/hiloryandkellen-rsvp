'use strict';

const router = require('express').Router();

router.use('/invitations', (req, res, next) => {
	console.log('Routing in to invitations module ...');
	next();
}, require('./invitations/invitations.router.js'));

module.exports = router;
