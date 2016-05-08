require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/kellen.steffen/Dropbox/code/hiloryandkellen-rsvp/client/rsvp/finder/finder.jsx":[function(require,module,exports){
"use strict";

var React = require('react');

// components

var Finder = React.createClass({
	displayName: "Finder",

	render: function render() {
		return React.createElement(
			"div",
			{ className: "finder" },
			React.createElement(
				"form",
				null,
				React.createElement(
					"label",
					null,
					React.createElement("input", { type: "text", placeholder: "What's your name?" })
				)
			)
		);
	}

});

module.exports = Finder;

},{"react":"react"}],"/Users/kellen.steffen/Dropbox/code/hiloryandkellen-rsvp/client/rsvp/form/form.jsx":[function(require,module,exports){
"use strict";

var React = require('react');

var Form = React.createClass({
	displayName: "Form",

	render: function render() {
		return React.createElement(
			"div",
			{ className: "form" },
			"This is the form."
		);
	}

});

module.exports = Form;

},{"react":"react"}],"/Users/kellen.steffen/Dropbox/code/hiloryandkellen-rsvp/client/rsvp/rsvp.jsx":[function(require,module,exports){
'use strict';

var React = require('react');

// data
var Actions = require('rsvp/actions');
var Store = require('rsvp/store');

// components
var Finder = require('./finder/finder.jsx');
var Form = require('./form/form.jsx');

var RSVP = React.createClass({
	displayName: 'RSVP',

	mixins: [Store.mixin()],

	onStoreChange: function onStoreChange() {
		this.setState({
			formData: Store.getForm(),
			rsvpData: Store.getRsvp()
		});
	},

	render: function render() {
		return React.createElement(
			'div',
			{ className: 'rsvp' },
			React.createElement(
				'h1',
				null,
				'Hilory & Kellen'
			),
			React.createElement(Finder, null),
			React.createElement(Form, null)
		);
	}

});

module.exports = RSVP;

},{"./finder/finder.jsx":"/Users/kellen.steffen/Dropbox/code/hiloryandkellen-rsvp/client/rsvp/finder/finder.jsx","./form/form.jsx":"/Users/kellen.steffen/Dropbox/code/hiloryandkellen-rsvp/client/rsvp/form/form.jsx","react":"react","rsvp/actions":"/Users/kellen.steffen/Dropbox/code/hiloryandkellen-rsvp/shared/rsvp/actions.js","rsvp/store":"/Users/kellen.steffen/Dropbox/code/hiloryandkellen-rsvp/shared/rsvp/store.js"}],"/Users/kellen.steffen/Dropbox/code/hiloryandkellen-rsvp/shared/rsvp/actions.js":[function(require,module,exports){
'use strict';

var dispatch = require('pico-flux').dispatch;

var Actions = {};

module.exports = Actions;

},{"pico-flux":"pico-flux"}],"/Users/kellen.steffen/Dropbox/code/hiloryandkellen-rsvp/shared/rsvp/clientConfig.js":[function(require,module,exports){
'use strict';

module.exports = require('browserify-stockpiler')({
	envPrefix: 'APP'
}).client;

},{"browserify-stockpiler":"browserify-stockpiler"}],"/Users/kellen.steffen/Dropbox/code/hiloryandkellen-rsvp/shared/rsvp/store.js":[function(require,module,exports){
'use strict';

var flux = require('pico-flux');
var ajax = require('superagent');

// data
var clientConfig = require('rsvp/clientConfig');

var getDefaultStatus = function getDefaultStatus() {
	return {
		working: false,
		err: null
	};
};

var Store = {
	form: {
		'status': getDefaultStatus()
	},
	rsvp: {
		'status': getDefaultStatus()
	}
};

module.exports = flux.createStore({

	GET_FORM: function GET_FORM(payload) {},

	GET_RSVP: function GET_RSVP(payload) {},

	SAVE_SVP: function SAVE_SVP(payload) {}

}, {

	getForm: function getForm() {
		return Store.form;
	},

	getRsvp: function getRsvp() {
		return Store.rsvp;
	}

});

},{"pico-flux":"pico-flux","rsvp/clientConfig":"/Users/kellen.steffen/Dropbox/code/hiloryandkellen-rsvp/shared/rsvp/clientConfig.js","superagent":"superagent"}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2VsbGVuLnN0ZWZmZW4vRHJvcGJveC9jb2RlL2hpbG9yeWFuZGtlbGxlbi1yc3ZwL2NsaWVudC9yc3ZwL2ZpbmRlci9maW5kZXIuanN4IiwiL1VzZXJzL2tlbGxlbi5zdGVmZmVuL0Ryb3Bib3gvY29kZS9oaWxvcnlhbmRrZWxsZW4tcnN2cC9jbGllbnQvcnN2cC9mb3JtL2Zvcm0uanN4IiwiL1VzZXJzL2tlbGxlbi5zdGVmZmVuL0Ryb3Bib3gvY29kZS9oaWxvcnlhbmRrZWxsZW4tcnN2cC9jbGllbnQvcnN2cC9yc3ZwLmpzeCIsIi9Vc2Vycy9rZWxsZW4uc3RlZmZlbi9Ecm9wYm94L2NvZGUvaGlsb3J5YW5ka2VsbGVuLXJzdnAvc2hhcmVkL3JzdnAvYWN0aW9ucy5qcyIsIi9Vc2Vycy9rZWxsZW4uc3RlZmZlbi9Ecm9wYm94L2NvZGUvaGlsb3J5YW5ka2VsbGVuLXJzdnAvc2hhcmVkL3JzdnAvY2xpZW50Q29uZmlnLmpzIiwiL1VzZXJzL2tlbGxlbi5zdGVmZmVuL0Ryb3Bib3gvY29kZS9oaWxvcnlhbmRrZWxsZW4tcnN2cC9zaGFyZWQvcnN2cC9zdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7O0FBSy9CLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUVoQyxPQUFNLEVBQUUsa0JBQVc7QUFDbEIsU0FDQzs7S0FBSyxTQUFTLEVBQUMsUUFBUTtHQUN0Qjs7O0lBQ0M7OztLQUNDLCtCQUFPLElBQUksRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLG1CQUFtQixHQUFHO0tBQzlDO0lBQ0Y7R0FDRixDQUNMO0VBQ0Y7O0NBRUQsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDOzs7OztBQ3JCeEIsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUcvQixJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFFOUIsT0FBTSxFQUFFLGtCQUFXO0FBQ2xCLFNBQ0M7O0tBQUssU0FBUyxFQUFDLE1BQU07O0dBRWYsQ0FDTDtFQUNGOztDQUVELENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzs7Ozs7QUNmdEIsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7QUFHL0IsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3hDLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzs7O0FBR3BDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQzlDLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOztBQUd4QyxJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFFOUIsT0FBTSxFQUFFLENBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFFOztBQUV6QixjQUFhLEVBQUUseUJBQVc7QUFDekIsTUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNiLFdBQVEsRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFO0FBQ3pCLFdBQVEsRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFO0dBQ3pCLENBQUMsQ0FBQztFQUNIOztBQUVELE9BQU0sRUFBRSxrQkFBVztBQUNsQixTQUNDOztLQUFLLFNBQVMsRUFBQyxNQUFNO0dBQ3BCOzs7O0lBQXdCO0dBQ3hCLG9CQUFDLE1BQU0sT0FBRztHQUNWLG9CQUFDLElBQUksT0FBRztHQUNILENBQ0w7RUFDRjs7Q0FFRCxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Ozs7O0FDbEN0QixJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxDQUFDOztBQUUvQyxJQUFNLE9BQU8sR0FBRyxFQUNmLENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Ozs7O0FDTHpCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDakQsVUFBUyxFQUFFLEtBQUs7Q0FDaEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQzs7Ozs7QUNGVixJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDbEMsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDOzs7QUFHbkMsSUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7O0FBRWxELElBQU0sZ0JBQWdCLEdBQUcsU0FBbkIsZ0JBQWdCLEdBQWM7QUFDbkMsUUFBTztBQUNOLFNBQU8sRUFBRSxLQUFLO0FBQ2QsS0FBRyxFQUFFLElBQUk7RUFDVCxDQUFDO0NBQ0YsQ0FBQzs7QUFFRixJQUFJLEtBQUssR0FBRztBQUNYLEtBQUksRUFBRTtBQUNMLFVBQVEsRUFBRSxnQkFBZ0IsRUFBRTtFQUM1QjtBQUNELEtBQUksRUFBRTtBQUNMLFVBQVEsRUFBRSxnQkFBZ0IsRUFBRTtFQUM1QjtDQUNELENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDOztBQUVqQyxTQUFRLEVBQUUsa0JBQVMsT0FBTyxFQUFFLEVBQzNCOztBQUVELFNBQVEsRUFBRSxrQkFBUyxPQUFPLEVBQUUsRUFDM0I7O0FBRUQsU0FBUSxFQUFFLGtCQUFTLE9BQU8sRUFBRSxFQUMzQjs7Q0FFRCxFQUFFOztBQUVGLFFBQU8sRUFBRSxtQkFBVztBQUNuQixTQUFPLEtBQUssQ0FBQyxJQUFJLENBQUM7RUFDbEI7O0FBRUQsUUFBTyxFQUFFLG1CQUFXO0FBQ25CLFNBQU8sS0FBSyxDQUFDLElBQUksQ0FBQztFQUNsQjs7Q0FFRCxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG4vLyBjb21wb25lbnRzXG5cblxuY29uc3QgRmluZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZmluZGVyXCI+XG5cdFx0XHRcdDxmb3JtPlxuXHRcdFx0XHRcdDxsYWJlbD5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiV2hhdCdzIHlvdXIgbmFtZT9cIiAvPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdDwvZm9ybT5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH0sXG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZpbmRlcjtcbiIsImNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuXG5jb25zdCBGb3JtID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxuXHRcdFx0XHRUaGlzIGlzIHRoZSBmb3JtLlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fSxcblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRm9ybTtcbiIsImNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuLy8gZGF0YVxuY29uc3QgQWN0aW9ucyA9IHJlcXVpcmUoJ3JzdnAvYWN0aW9ucycpO1xuY29uc3QgU3RvcmUgPSByZXF1aXJlKCdyc3ZwL3N0b3JlJyk7XG5cbi8vIGNvbXBvbmVudHNcbmNvbnN0IEZpbmRlciA9IHJlcXVpcmUoJy4vZmluZGVyL2ZpbmRlci5qc3gnKTtcbmNvbnN0IEZvcm0gPSByZXF1aXJlKCcuL2Zvcm0vZm9ybS5qc3gnKTtcblxuXG5jb25zdCBSU1ZQID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdG1peGluczogWyBTdG9yZS5taXhpbigpIF0sXG5cblx0b25TdG9yZUNoYW5nZTogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRmb3JtRGF0YTogU3RvcmUuZ2V0Rm9ybSgpLFxuXHRcdFx0cnN2cERhdGE6IFN0b3JlLmdldFJzdnAoKSxcblx0XHR9KTtcblx0fSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJzdnBcIj5cblx0XHRcdFx0PGgxPkhpbG9yeSAmIEtlbGxlbjwvaDE+XG5cdFx0XHRcdDxGaW5kZXIgLz5cblx0XHRcdFx0PEZvcm0gLz5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH0sXG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJTVlA7XG4iLCJjb25zdCBkaXNwYXRjaCA9IHJlcXVpcmUoJ3BpY28tZmx1eCcpLmRpc3BhdGNoO1xuXG5jb25zdCBBY3Rpb25zID0ge1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBY3Rpb25zO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCdicm93c2VyaWZ5LXN0b2NrcGlsZXInKSh7XG5cdGVudlByZWZpeDogJ0FQUCcsXG59KS5jbGllbnQ7XG4iLCJjb25zdCBmbHV4ID0gcmVxdWlyZSgncGljby1mbHV4Jyk7XG5jb25zdCBhamF4ID0gcmVxdWlyZSgnc3VwZXJhZ2VudCcpO1xuXG4vLyBkYXRhXG5jb25zdCBjbGllbnRDb25maWcgPSByZXF1aXJlKCdyc3ZwL2NsaWVudENvbmZpZycpO1xuXG5jb25zdCBnZXREZWZhdWx0U3RhdHVzID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB7XG5cdFx0d29ya2luZzogZmFsc2UsXG5cdFx0ZXJyOiBudWxsLFxuXHR9O1xufTtcblxubGV0IFN0b3JlID0ge1xuXHRmb3JtOiB7XG5cdFx0J3N0YXR1cyc6IGdldERlZmF1bHRTdGF0dXMoKSxcblx0fSxcblx0cnN2cDoge1xuXHRcdCdzdGF0dXMnOiBnZXREZWZhdWx0U3RhdHVzKCksXG5cdH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZsdXguY3JlYXRlU3RvcmUoe1xuXG5cdEdFVF9GT1JNOiBmdW5jdGlvbihwYXlsb2FkKSB7XG5cdH0sXG5cblx0R0VUX1JTVlA6IGZ1bmN0aW9uKHBheWxvYWQpIHtcblx0fSxcblxuXHRTQVZFX1NWUDogZnVuY3Rpb24ocGF5bG9hZCkge1xuXHR9LFxuXG59LCB7XG5cblx0Z2V0Rm9ybTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIFN0b3JlLmZvcm07XG5cdH0sXG5cblx0Z2V0UnN2cDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIFN0b3JlLnJzdnA7XG5cdH0sXG5cbn0pO1xuIl19
