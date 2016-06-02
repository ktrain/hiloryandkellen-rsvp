const React = require('react');
const headtags = require('vitreum/headtags');

// data
const Actions = require('rsvp/actions');
const Store = require('rsvp/store');

// components
const Finder = require('./finder/finder.jsx');
const Form = require('./form/form.jsx');


const RSVP = React.createClass({

	mixins: [ Store.mixin() ],

	onStoreChange: function() {
		this.setState({
			invitation: Store.getInvitation(),
			rsvp: Store.getRsvp(),
		});
	},

	getInitialState: function() {
		return {
			invitation: Store.getInvitation(),
			rsvp: Store.getRsvp(),
		};
	},

	componentWillMount: function() {
		headtags.setTitle('RSVP — Hilory & Kellen');
		headtags.setDescription("RSVP to Hilory and Kellen's wedding!");
	},

	handleSave: function(data, evt) {
		Actions.saveRsvp(data);
	},

	renderResult: function() {
		let rsvp = this.state.rsvp;
		if (rsvp.status.err || rsvp.status.busy || !rsvp.data) {
			return null;
		}
		let content = "We're sorry you won't be able to make it!";
		let attending = _.reduce(this.state.rsvp.data.guests, (cur, guest) => {
			let guestIsAttendingAtLeastOneThing = _.some(_.values(guest.isAttending));
			console.log(cur, 'guest is attending at least one thing', guestIsAttendingAtLeastOneThing);
			return cur || guestIsAttendingAtLeastOneThing;
		}, false);
		if (attending) {
			content = "We're so excited to see you on July 29!";
		}
		return <div className="result">
			<div className="content">
				<p>{content}</p>
				<p>You can come back and change your RSVP through June 30!</p>
			</div>
		</div>
	},

	render: function() {
		return (
			<div className="rsvp">
				<section className="top">
					<h1>RSVP to Hilory & Kellen's Wedding</h1>
				</section>
				<section>
					<Finder />
				</section>
				<section>
					<Form
						form={this.state.invitation.data}
						initialRsvp={this.state.rsvp.data}
						status={this.state.rsvp.status}
						onSave={this.handleSave} />
				</section>
				<section>
					{this.renderResult()}
				</section>
			</div>
		);
	},

});

module.exports = RSVP;
