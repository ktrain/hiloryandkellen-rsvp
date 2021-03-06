const React = require('react');
const ReactDOM = require('react-dom');
const cx = require('classnames');


const TextInput = React.createClass({

	getDefaultProps: function() {
		return {
			label: '',
			name: '',
			value: '',
			placeholder: '',
			className: null,
			onChange: function() {},
		};
	},

	focus: function() {
		ReactDOM.findDOMNode(this.refs.input).focus();
	},

	render: function() {
		return (
			<label className={cx('textInput', this.props.className)}>
				<span className="label">{this.props.label}</span>
				<input type="text"
					ref="input"
					name={this.props.name}
					value={this.props.value}
					placeholder={this.props.placeholder}
					onChange={this.props.onChange} />
			</label>
		);
	},

});

module.exports = TextInput;
