const React = require('react');

// components


const Finder = React.createClass({

	render: function() {
		return (
			<div className="finder">
				<form>
					<label>
						<input type="text" placeholder="What's your name?" />
					</label>
				</form>
			</div>
		);
	},

});

module.exports = Finder;
