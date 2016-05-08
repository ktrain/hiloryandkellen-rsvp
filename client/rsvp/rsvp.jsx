const React = require('react');

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
			formData: Store.getForm(),
			rsvpData: Store.getRsvp(),
		});
	},

	render: function() {
		return (
			<div className="rsvp">
				<h1>Hilory & Kellen</h1>
				<Finder />
				<Form />
			</div>
		);
	},

});

module.exports = RSVP;
