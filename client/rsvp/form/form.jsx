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

	handleChange: function(path, evt) {
		let form = this.state.form;
		_.set(form, path, evt.target.value);
		//form[fieldName] = evt.target.value;
		console.log(path, '=', `'${form[path]}'`);
		this.setState({
			form: form,
		});
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
					name="plusOneName"
					placeholder="Full name"
					value={this.state.form.plusOneName}
					onChange={this.handleChange.bind(this, "plusOneName")} />
				<TextInput
					label="Dietary restrictions?"
					name="plusOneDietaryRestrictions"
					placeholder="Lead-free, fruitarian, master cleanse, etc."
					value={this.state.form.plusOneDietaryRestrictions}
					onChange={this.handleChange.bind(this, "plusOneDietaryRestrictions")} />
			</div>
		);
	},

	renderGuests: function() {
		let guests = _.map(this.state.form.guests, (guest, index) => {
			let path = `guests[${index}].dietaryRestrictions`
			return (
				<div key={index} className="guest">
					<TextInput
						label={guest.name}
						name={path}
						placeholder="Dietary restrictions?"
						onChange={this.handleChange.bind(this, path)} />
				</div>
			);
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
						onChange={this.handleChange.bind(this, "email")} />
					<h3>Who's coming?</h3>
					<div className="guests">
						{this.renderGuests()}
					</div>
					{this.renderPlusOne()}
					<div className="message">
						<h3>Add a personal message!</h3>
						<label>
							<textarea
								placeholder="omgomgomgomgomgomg"
								value={this.state.form.message}
								onChange={this.handleChange.bind(this, "message")} />
						</label>
					</div>

					<button onClick={this.handleSave}>Save RSVP</button>
				</form>
			</div>
		);
	},

});

module.exports = Form;
