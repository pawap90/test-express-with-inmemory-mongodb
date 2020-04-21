'use strict';

require('dotenv').config();
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoServer = new MongoMemoryServer();


/**
 * Start in-memory db.
 * Setup the connection string env variable.
 */
module.exports.setupDatabase = async () => {
    const uri = await mongoServer.getUri();

    // Dynamically setup the connection string to the in-memory db for the rest api to use.
    process.env.DB_CONNECTIONSTRING = uri;
};

/**
 * Stop the in-memory database.
 */
module.exports.closeDatabase = async () => {
    await mongoServer.stop();
};