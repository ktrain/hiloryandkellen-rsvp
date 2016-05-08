const React = require('react');

// data
const Actions = require('rsvp/actions');


const Finder = React.createClass({

	getDefaultProps: function() {
		return {};
	},

	getInitialState: function() {
		return {
			name: '',
		};
	},

	handleChange: function(evt) {
		this.setState({ name: evt.target.value });
	},

	handleFindClick: function(evt) {
		evt && evt.preventDefault();
		Actions.getForm(this.state.name);
	},

	render: function() {
		return (
			<div className="finder">
				<form>
					<label>
						What's your name?
						<input
							type="text"
							placeholder="Full name"
							value={this.state.name}
							onChange={this.handleChange} />
					</label>
					<button onClick={this.handleFindClick}>Look me up!</button>
				</form>
			</div>
		);
	},

});

module.exports = Finder;
