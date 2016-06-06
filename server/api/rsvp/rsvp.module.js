'use strict';

const config = require('browserify-stockpiler')({
	envPrefix: 'APP',
});
const Emailer = require('../../emailer');

const ATTENDING_HTML = 
`<p>Thanks for RSVPing!</p>
<p>
We can't wait to see you on July 29!
You can update your RSVP through June 30 by coming back to
<a href="http://rsvp.hiloryandkellen.com">rsvp.hiloryandkellen.com</a>.
</p>
<p>-Future Mr. and Mrs. Steffen</p>`;
const NOTATTENDING_HTML =
`<p>Thanks for RSVPing!</p>
<p>
We're going to miss you.
You can update your RSVP through June 30 by coming back to
<a href="http://rsvp.hiloryandkellen.com">rsvp.hiloryandkellen.com</a>.
</p>
<p>- The future Mr. and Mrs. Steffen</p>`;



const RsvpModule = {
	sendConfirmationEmail: (rsvp) => {
		// send confirmation email
		return Emailer.send(
				rsvp.email,
				`Hilory and Kellen's Wedding - RSVP Received`,
				rsvp.isSomeoneAttending() ? ATTENDING_HTML : NOTATTENDING_HTML
		).then(() => {
			// send notification email to admins
			let isSomeoneComing = rsvp.isSomeoneAttending() ? 'Yes' : 'No';
			const INTERNAL_HTML =
			`<dt>
			<dt>Email:</dt><dd>${rsvp.email}</dd>
			<dt>Is someone coming?</dt><dd>${isSomeoneComing}</dd>
			</dt>`;
			return Emailer.send(
					config.email.admins.split(','),
					`Wedding RSVP - ${rsvp.email}`,
					INTERNAL_HTML
			);
		});
	},
};

module.exports = RsvpModule;
