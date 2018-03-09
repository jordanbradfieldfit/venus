/**
 * Internal Libraries
 */
const logger = new(require('../../lib/logger'))('core/broadcaster/start.js');

/**
 * Internal helpers
 */
const broadcasterApi = require('./api/server');
const broadcasterSocket = require('./socket/server');
const database = require('../../database/connect');

const databaseConfig = require('../../config/database.json').broadcaster.instances;

module.exports = (ready) => {
    Promise.all(Object.keys(databaseConfig).map(config => {
        return database.init(databaseConfig[config]);
    })).then(success => {
        if(success.reduce((last, next) => {
            return last && next;
        })){
            broadcasterApi.start();
            broadcasterSocket.start(ready);
            logger.info("Broadcaster up and running.");
        }else{
            logger.error("Broadcaster ran into an error setting up the database connections.");
            process.exit(1);
        }
    }).catch(error => {
        logger.error("Error starting broadcaster servers: "+error);
        process.exit(1);
    })
}