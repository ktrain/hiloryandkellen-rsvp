'use strict';

const config = require('stockpiler')({
	envPrefix: 'APP',
});
const express = require('express');
const bodyParser = require('body-parser');

const vitreumRender = require('vitreum/render');

const api = require('./api');
const app = express();

app.use(express.static('./build'));

// mount api
app.use(bodyParser.json());
app.use('/api', (req, res, next) => { console.info('Routing in to API ...'); next(); }, api);

// web endpoint
app.get('/', (req, res) => {
	vitreumRender({
		page: './build/rsvp/bundle.dot',
		clearRequireCache: process.env.NODE_ENV === 'development',
		globals: {
			config: config.client,
		},
		prerenderWith: './client/rsvp/rsvp.jsx',
		initialProps: {
			url: req.originalUrl,
		},
	}, (err, page) => {
		if (err) {
			console.error(err);
		}
		return res.send(page);
	});
});

module.exports = app;
