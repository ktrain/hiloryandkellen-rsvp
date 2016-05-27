'use strict';

const _ = require('lodash');
const config = require('browserify-stockpiler')({
	envPrefix: 'APP',
});
const Sequelize = require('sequelize');

let sequelize = null;
let connectionOptions = {
	logging: config.db.logging ? console.info : false,
	replication: config.db.replication,
	dialectOptions: config.db.dialectOptions,
};

if (process.env.DATABASE_URL) {
	sequelize = new Sequelize(process.env.DATABASE_URL, connectionOptions);
} else {
	connectionOptions = _.extend(connectionOptions, {
		dialect: 'postgres',
		host: config.db.host,
		port: config.db.port,
	});
	sequelize = new Sequelize(
		config.db.database,
		config.db.user,
		config.db.pass,
		connectionOptions
	);
}

const db = {
	Sequelize: Sequelize,
	sequelize: sequelize,
};

db.ready = db.sequelize.sync()
	.catch((err) => {
		err = (err instanceof Error) ? err : new Error(err);
		console.error('Failed to sync database:', err.stack);
	});

module.exports = db;
