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
			</div>
		);
	},

});

module.exports = RSVP;
