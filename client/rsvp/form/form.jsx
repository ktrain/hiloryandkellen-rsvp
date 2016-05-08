const React = require('react');
const _ = require('lodash');


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

	renderPlusOne: function() {
		if (!this.props.form.hasPlusOne) {
			return null;
		}

		return <label>
			<h3>You've got a plus-one!</h3>
			<input type="text" name="plusOne" placeholder="Full name" />
			<label>
				<input type="text" name="dietaryRestrictions" placeholder="Dietary restrictions?" />
			</label>
		</label>;
	},

	renderGuests: function() {
		let guests = _.map(this.state.form.guests, (guest, index) => {
			return <div key={index} className="guest">
				<label>
					{guest.name}
					<input type="text" name="dietaryRestrictions" placeholder="Dietary restrictions?" />
				</label>
			</div>;
		});

		return guests;
	},

	render: function() {
		return (
			<div className="form">
				<h2>You're on the list!</h2>
				<form>
					<label>
						Email
						<input type="text" name="email" placeholder="Email" value={this.state.form.email} />
					</label>
					<h3>Who's coming?</h3>
					<div className="guests">
						{this.renderGuests()}
					</div>
					<div className="plusOne">
						{this.renderPlusOne()}
					</div>
					<div className="message">
						<label>
							Add a personal message!
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
