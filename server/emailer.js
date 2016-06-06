'use strict';

const _ = require('lodash');
const config = require('browserify-stockpiler')({
	envPrefix: 'APP',
});

if (!config.SENDGRID_USERNAME || !config.SENDGRID_PASSWORD) {
	throw new Error(
			'Email vars config.SENDGRID_USERNAME and config.SENDGRID_PASSWORD are not configured.'
	);
}
const sendgrid = require('sendgrid')(config.SENDGRID_USERNAME, config.SENDGRID_PASSWORD);


const Email = {
	send: (to, subject, html) => {
		const email = new sendgrid.Email({
			from: config.email.from,
			subject: subject,
			html: html,
		});
		if (_.isArray(to)) {
			_.each(to, (addr) => {
				email.addTo(addr);
			});
		} else {
			email.addTo(to);
		}
		return new Promise((resolve, reject) => {
			sendgrid.send(email, (err, json) => {
				if (err) {
					console.error(err);
					return reject(err);
				}
				console.log('Email sent', json);
				resolve(json);
			});
		});
	},
};

module.exports = Email;
