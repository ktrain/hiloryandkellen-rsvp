'use strict';

module.exports = (err, req, res, next) => {
	if (!(err instanceof Error)) {
		console.error(`Unexpected error: ${err}`);
		res.status(500).send({ message: 'Something weird happened.' });
		return;
	}

	if (err.name.startsWith('Sequelize')) {
		// no need to log here
		res.status(400).send(err.errors[0]);
		return;
	}

	console.error(err);
	res.status(500).send({ message: 'Something weird happened.' });
};
