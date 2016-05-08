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
			form: Store.getForm(),
		});
	},

	getInitialState: function() {
		return {
			form: Store.getForm(),
		};
	},

	handleSave: function(data, evt) {
		Actions.saveForm(data);
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
					<Form form={this.state.form.data} status={this.state.form.status} onSave={this.handleSave} />
				</section>
			</div>
		);
	},

});

module.exports = RSVP;
