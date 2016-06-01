'use strict';

module.exports = (err, req, res, next) => {
	if (err.name && err.name.startsWith('Sequelize')) {
		// no need to log here
		res.status(400).send(err.errors[0]);
		return;
	}

	if (err.status) {
		res.status(err.status).send(err);
		return;
	}

	console.error('Unexpected error', err.stack);
	res.status(500).send({ message: 'Something weird happened.' });
};
