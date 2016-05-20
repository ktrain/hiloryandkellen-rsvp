require('app-module-path').addPath('./shared');

const config = require('nconf')
	.argv()
	.env({ lowerCase: true })
	.file('environment', { file: `config/${process.env.NODE_ENV}.json` })
	.file('defaults', { file: 'config/default.json' });

const db = require('./server/db');
const app = require('./server/app');

const PORT = config.get('port');
db.ready.then(() => {
	app.listen(PORT, () => {
		console.info(`Listening on ${PORT}.`);
	});
});
