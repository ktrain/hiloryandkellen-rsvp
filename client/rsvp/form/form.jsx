const React = require('react');
const _ = require('lodash');

// components
const TextInput = require('rsvp/components/input/text.jsx');

// data
const Fields = {
	'Rehearsal Dinner': {
		type: 'checkbox',
		valueAttribute: 'checked',
	},
	'Wedding': {
		type: 'checkbox',
		valueAttribute: 'checked',
	},
	'Brunch': {
		type: 'checkbox',
		valueAttribute: 'checked',
	},
	'Dietary Restrictions': {
		type: 'text',
		valueAttribute: 'value',
	},
};


const Form = React.createClass({

	getDefaultProps: function() {
		return {
			onSave: function() {},
			form: {},
			initialRsvp: {},
			status: {},
		};
	},

	getInitialState: function() {
		return {
			rsvp: _.cloneDeep(this.props.initialRsvp),
		};
	},

	handleSave: function(evt) {
		evt && evt.preventDefault();
		this.props.onSave(this.state.rsvp, evt);
	},

	handleChange: function(valueAttribute, evt) {
		let rsvp = this.state.rsvp;
		let path = evt.target.name;
		_.set(rsvp, path, evt.target[valueAttribute]);
		console.log(path, '=', JSON.stringify(_.get(rsvp, path)));
		this.setState({ rsvp: rsvp });
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
					name="plusOne.name"
					placeholder="Full name"
					value={this.state.rsvp.plusOne.name}
					onChange={this.handleChange.bind(this, 'value')} />
				<TextInput
					label="Dietary restrictions?"
					name="plusOne.dietaryRestrictions"
					placeholder="Lead-free, fruitarian, etc."
					value={this.state.rsvp.plusOne.dietaryRestrictions}
					onChange={this.handleChange.bind(this, 'value')} />
			</div>
		);
	},

	renderGuestRows: function(headers) {
		let rows = _.map(this.props.form.guests, (guest, guestIndex) => {
			let path = `guests[${guestIndex}].dietaryRestrictions`;
			return <tr key={guestIndex}>
				<td className="guestName cell">{guest.name}</td>
				{_.map(headers, (header, headerIndex) => {
					let path = `guests[${guestIndex}]${header.path}`;
					return (
						<td key={headerIndex}>
							<label>
								<input
									type={Fields[header.title].type}
									className="cell"
									name={path}
									placeholder={header.placeholder || header.title}
									onChange={this.handleChange.bind(this, Fields[header.title].valueAttribute)} />
							</label>
						</td>
					);
			   })}
			</tr>
		});

		return rows;
	},

	renderGuests: function() {
		let eventHeaders = _.map(this.props.form.events, (evt, index) => {
			return {
				title: evt,
				path: `.isAttending['${evt}']`,
			};
		});
		let headers = _.concat(eventHeaders, [{
			title: 'Dietary Restrictions',
			placeholder: 'Lead-free, fruitarian, etc.',
			path: '.dietaryRestrictions',
		}]);
		let guests = (
			<div className="guests">
				<table>
					<thead>
						<tr><th>Guest Name</th></tr>
						{_.map(headers, (header, index) => {
							return <tr key={index}><th>{header.title}</th></tr>;
						})}
					</thead>
					<tbody>
						{this.renderGuestRows(headers)}
					</tbody>
				</table>
			</div>
		);

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
						name="email"
						value={this.state.rsvp.email}
						onChange={this.handleChange.bind(this, 'value')} />
					<h3>Who's coming?</h3>
					<div className="guests">
						{this.renderGuests()}
					</div>
					{this.renderPlusOne()}
					<div className="musicRequests">
						<h3>Got any music requests?</h3>
						<textarea
							placeholder="Turn down for what?"
							value={this.state.rsvp.musicRequests}
							name="musicRequests"
							onChange={this.handleChange.bind(this, 'value')} />
					</div>
					<div className="message">
						<h3>Add a personal message!</h3>
						<h4>Thoughts, advice for the couple, or just something you want to say!</h4>
						<label>
							<textarea
								placeholder="omgomgomgomgomgomg"
								value={this.state.rsvp.message}
								name="message"
								onChange={this.handleChange.bind(this, 'value')} />
						</label>
					</div>

					<button onClick={this.handleSave}>Save RSVP</button>
				</form>
			</div>
		);
	},

});

module.exports = Form;
