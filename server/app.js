require('app-module-path').addPath('./shared');

const config = require('stockpiler')({
	envPrefix: 'APP',
});
const express = require('express');
const bodyParser = require('body-parser');

const vitreumRender = require('vitreum/render');

const routes = require('./routes');
const app = express();

app.use(express.static('./build'));

app.use(bodyParser.json());
app.use('/api', routes);

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
