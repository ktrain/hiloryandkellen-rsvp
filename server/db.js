'use strict';

const _ = require('lodash');
const config = require('nconf');
const Sequelize = require('sequelize');

let sequelize = null;
let connectionOptions = {
	logging: config.get('db:logging') ? console.info : false,
	replication: config.get('db:replication'),
	dialectOptions: config.get('db:dialectOptions'),
};

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, connectionOptions);
} else {
  connectionOptions = _.extend(connectionOptions, {
	dialect: 'postgres',
	host: config.get('db:host'),
	port: config.get('db:port'),
  });
  sequelize = new Sequelize(
	config.get('db:database'),
	config.get('db:user'),
	config.get('db:pass'),
	connectionOptions
  );
}

const db = {
	Sequelize: Sequelize,
	sequelize: sequelize,
};

// TODO: load up models so they can be synced

db.ready = db.sequelize.sync()
	.catch((err) => {
		err = (err instanceof Error) ? err : new Error(err);
		console.error('Failed to sync database:', err.stack);
	});

module.exports = db;
