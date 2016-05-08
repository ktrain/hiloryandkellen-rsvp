require('app-module-path').addPath('./shared');

const app = require('./server/app');
const config = require('nconf')
	.argv()
	.env({ lowerCase: true })
	.file('environment', { file: `config/${process.env.NODE_ENV}.json` })
	.file('defaults', { file: 'config/default.json' });

const PORT = config.get('port');
app.listen(PORT, () => {
	console.info(`Listening on ${PORT}.`);
});
