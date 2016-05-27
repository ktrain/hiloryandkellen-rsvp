const React = require('react');

// components
const TextInput = require('rsvp/components/input/text.jsx');

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
		Actions.getInvitation(this.state.name);
	},

	render: function() {
		return (
			<div className="finder">
				<form>
					<TextInput
						label="What's your name?"
						placeholder="Full name"
						value={this.state.name}
						onChange={this.handleChange} />
					<button onClick={this.handleFindClick}>Look me up!</button>
				</form>
			</div>
		);
	},

});

module.exports = Finder;
