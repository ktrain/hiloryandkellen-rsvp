require('app-module-path').addPath('./shared');

const config = require('browserify-stockpiler')({
	envPrefix: 'APP',
});

const db = require('./server/db');
const app = require('./server/app');

const PORT = process.env.PORT || config.server.port;
db.ready.then(() => {
	app.listen(PORT, () => {
		console.info(`Listening on ${PORT}.`);
	});
});
