const React = require('react');
const cx = require('classnames');

// components
const TextInput = require('rsvp/components/input/text.jsx');

// data
const Actions = require('rsvp/actions');
const Store = require('rsvp/store');


const Finder = React.createClass({

	mixins: [Store.mixin()],

	onStoreChange: function() {
		this.setState({ invitation: Store.getInvitation() });
	},

	getDefaultProps: function() {
		return {};
	},

	getInitialState: function() {
		return {
			// TODO: make this blank
			name: 'alfred mendoza',
			invitation: Store.getInvitation(),
		};
	},

	handleChange: function(evt) {
		this.setState({ name: evt.target.value });
	},

	handleSubmit: function(evt) {
		evt && evt.preventDefault();
		Actions.getInvitation(this.state.name);
	},

	renderButton: function() {
		const busy = this.state.invitation.status.busy;
		const content = busy ? <i className="fa fa-spinner fa-spin" /> : 'Look me up!';
		return <button
			classNames={cx({ busy: busy })}
			disabled={busy}
			>{content}</button>;
	},

	render: function() {
		return (
			<div className="finder">
				<form onSubmit={this.handleSubmit}>
					<TextInput
						label="What's your name?"
						placeholder="Full name"
						value={this.state.name}
						onChange={this.handleChange} />
					{this.renderButton()}
				</form>
			</div>
		);
	},

});

module.exports = Finder;
