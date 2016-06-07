const React = require('react');
const _ = require('lodash');

// components
const TextInput = require('rsvp/components/input/text.jsx');

// data
const Store = require('rsvp/store');
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
			rsvp: _.cloneDeep(this.props.initialRsvp) || {},
			plusOneActivated: false,
		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({ rsvp: _.cloneDeep(nextProps.initialRsvp) });
	},

	handleSubmit: function(evt) {
		evt && evt.preventDefault();
		this.props.onSave(this.state.rsvp, evt);
	},

	handleChange: function(valueAttribute, evt) {
		let rsvp = this.state.rsvp;
		let path = evt.target.name;
		_.set(rsvp, path, evt.target[valueAttribute]);
		//console.log(path, '=', JSON.stringify(_.get(rsvp, path)));
		this.setState({ rsvp: rsvp });
	},

	handleActivatePlusOne: function(evt) {
		evt && evt.preventDefault();
		this.setState({ plusOneActivated: true });
	},

	renderPlusOne: function() {
		if (!this.props.form.hasPlusOne) {
			return null;
		}

		let content;

		if (!this.state.plusOneActivated) {
			content = <div className="plusOne">
				<button type="button" onClick={this.handleActivatePlusOne}>I'll be bringing a guest!</button>
			</div>;
		} else {
			content = [
				<TextInput
					key={0}
					label="What's your guest's name?"
					name="plusOne.name"
					placeholder="Full name"
					value={this.state.rsvp.plusOne.name}
					onChange={this.handleChange.bind(this, 'value')} />,
				<TextInput
					key={1}
					label="Dietary restrictions?"
					name="plusOne.dietaryRestrictions"
					placeholder="Lead-free, fruitarian, etc."
					value={this.state.rsvp.plusOne.dietaryRestrictions}
					onChange={this.handleChange.bind(this, 'value')} />
			];
		}

		return (
			<div className="plusOne">
				<h3>You've got a plus-one!</h3>
				{content}
			</div>
		);
	},

	renderGuestRows: function(headers) {
		let rows = _.map(this.props.form.guests, (guest, guestIndex) => {
			let path = `guests[${guestIndex}].dietaryRestrictions`;
			return <tr key={guestIndex}>
				<td className="guestName cell">{guest}</td>
				{_.map(headers, (header, headerIndex) => {
					let path = `guests[${guestIndex}]${header.path}`;
					let value = _.get(this.state.rsvp, path);
					//console.log('get', this.state.rsvp, path, _.get(this.state.rsvp, path));
					return (
						<td key={headerIndex}>
							<label>
								<input
									type={Fields[header.title].type}
									className="cell"
									name={path}
									placeholder={header.placeholder || header.title}
									checked={value || false}
									value={value}
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
		let eventSuperHeaderWidth = eventHeaders.length.toString();
		let headers = _.concat(eventHeaders, [{
			title: 'Dietary Restrictions',
			placeholder: 'Lead-free, fruitarian, etc.',
			path: '.dietaryRestrictions',
		}]);
		let guests = (
			<div className="guests">
				<table>
					<thead>
						<tr>
							<th></th>
							<th
								className="attending"
								colSpan={eventSuperHeaderWidth}
								scope="colgroup">Attending</th>
							<th></th>
						</tr>
						<tr>
							<th>Guest Name</th>
							{_.map(eventHeaders, (header, index) => {
								return <th className="event" key={index}>{header.title}</th>;
							})}
							<th>Dietary Restrictions</th>
						</tr>
					</thead>
					<tbody>
						{this.renderGuestRows(headers)}
					</tbody>
				</table>
			</div>
		);

		return guests;
	},

	renderError: function() {
		const err = this.props.status.err;
		if (!err) {
			return null;
		}

		let content = 'Something weird happened. Please try again later.';
		if (err.type === 'notNull Violation') {
			content = `Please enter your ${err.path}.`;
		} else if (err.type === 'Validation error') {
			content = `Please enter a valid ${err.path}.`;
		}

		return <div className="error">
			<div className="content">{content}</div>
		</div>;
	},

	renderSaveButton: function() {
		let content = "Save RSVP";
		if (this.props.status.busy) {
			content = <i className="fa fa-spinner fa-spin" />;
		}
		return <button disabled={this.props.status.busy}>{content}</button>;
	},

	render: function() {
		if (!this.props.form) {
			return null;
		}

		const rsvp = this.state.rsvp || {};

		return (
			<div className="form">
				<h2>You're on the list!</h2>
				<h4>We just need a little information.</h4>
				<form onSubmit={this.handleSubmit}>
					<TextInput
						label="Email"
						placeholder="Email"
						name="email"
						value={rsvp.email}
						onChange={this.handleChange.bind(this, 'value')} />
					<h3>Who's coming?</h3>
					<div className="guests">
						{this.renderGuests()}
					</div>
					{this.renderPlusOne()}
					<div className="musicRequests">
						<h3>Have any music requests?</h3>
						<textarea
							placeholder="Turn down for what?"
							value={rsvp.musicRequests}
							name="musicRequests"
							onChange={this.handleChange.bind(this, 'value')} />
					</div>
					<div className="message">
						<h3>Add a personal message!</h3>
						<h4>Thoughts, advice for the couple, or just something you want to say!</h4>
						<label>
							<textarea
								placeholder="omgomgomgomgomgomg"
								value={rsvp.message}
								name="message"
								onChange={this.handleChange.bind(this, 'value')} />
						</label>
					</div>

					{this.renderSaveButton()}

					{this.renderError()}
				</form>
			</div>
		);
	},

});

module.exports = Form;
