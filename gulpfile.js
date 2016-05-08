require('app-module-path').addPath('./shared');

var vitreumTasks = require('vitreum/tasks');

var gulp = vitreumTasks(require('gulp'), {
	entryPoints: ['./client/rsvp'],
	DEV: true,

	buildPath: './build/',
	pageTemplate: './client/template.dot',

	projectModules: ['./shared/rsvp'],
	additionalRequirePaths: ['./shared'],
	assetExts: ['*.svg', '*.png', '*.jpg', '*.pdf', '*.eot', '*.ttf', '*.woff', '*.woff2', '*.ico'],

	serverWatchPaths: ['server'],
	serverScript: 'server.js',
	libs: [
		'react', 'react-dom', 'react-addons-css-transition-group', 'classnames',
		'vitreum/headtags', 'browserify-stockpiler', 'lodash',
		'superagent', 'pico-flux',
	],
});
