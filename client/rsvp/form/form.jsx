const React = require('react');
const _ = require('lodash');

// components
const TextInput = require('rsvp/components/input/text.jsx');


const Form = React.createClass({

	getDefaultProps: function() {
		return {
			onSave: function() {},
			form: {
				email: '',
				guests: [],
				hasPlusOne: false,
				message: '',
			},
			'status': {},
		};
	},

	getInitialState: function() {
		return {
			form: _.cloneDeep(this.props.form),
		};
	},

	handleSave: function(evt) {
		evt && evt.preventDefault();
		this.props.onSave(evt);
	},

	handleChange: function(evt) {
	},

	renderPlusOne: function() {
		if (!this.props.form.hasPlusOne) {
			return null;
		}

		return (
			<div className="plusOne">
				<h3>You've got a plus-one!</h3>
				<TextInput
					label="What's your guest's name?"
					placeholder="Full name"
					value="" />
				<TextInput
					label="Dietary restrictions?"
					placeholder="Lead-free, fruitarian, master cleanse, etc."
					value="" />
			</div>
		);
	},

	renderGuests: function() {
		let guests = _.map(this.state.form.guests, (guest, index) => {
			return <div key={index} className="guest">
				<TextInput
					label={guest.name}
					name=""
					placeholder="Dietary restrictions?" />
			</div>;
		});

		return guests;
	},

	render: function() {
		return (
			<div className="form">
				<h2>You're on the list!</h2>
				<form>
					<TextInput
						label="Email"
						placeholder="Email"
						value={this.state.form.email}
						onChange={this.handleEmailChange} />
					<h3>Who's coming?</h3>
					<div className="guests">
						{this.renderGuests()}
					</div>
					{this.renderPlusOne()}
					<div className="message">
						<h3>Add a personal message!</h3>
						<label>
							<textarea placeholder="omgomgomgomgomgomg" />
						</label>
					</div>

					<button onClick={this.handleSave}>Save RSVP</button>
				</form>
			</div>
		);
	},

});

module.exports = Form;
