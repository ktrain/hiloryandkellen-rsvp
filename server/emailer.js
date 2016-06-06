'use strict';

const _ = require('lodash');
const config = require('browserify-stockpiler')({
	envPrefix: 'APP',
});

const username = config.sendgridUsername || process.env.SENDGRID_USERNAME;
const password = config.sendgridPassword || process.env.SENDGRID_PASSWORD;
if (!username || !password) {
	throw new Error('Email config vars are missing.');
}
const sendgrid = require('sendgrid')(username, password);


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
