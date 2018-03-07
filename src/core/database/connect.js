/**
 * External libraries
 */
const mongod = require('mongod'),
    mongodb = require('mongodb'),
    filesystem = require('fs');

/**
 * Internal libraries
 */
const logger = new(require('../../lib/logger'))('core/database/connect.js');

/**
 * Internal helpers
 */
const api = require('./api');

/**
 * Configs
 */
const errorConfig = require('../../config/errors.json');

/**
 * MongoD and MongoClient connections
 */
const MongoDConnections = new Map();
const MongoClientConnections = new Map();

const isMongoDConnected = (dbConfig) => {
    try {
        return MongoDConnections.get(dbConfig.name).isRunning;
    } catch (error) {
        return false;
    }
}

const doesDataDirectoryExist = (dbConfig) => {
    if(filesystem.existsSync(dbConfig.path)){
        return true;
    }else{
        filesystem.mkdirSync(dbConfig.path);
        return true;
    }
}

const buildConnectionString = (dbConfig) => {
    return dbConfig.protocol + dbConfig.host + ":" + dbConfig.port + "/" + dbConfig.name;
}

const startMongoClientConnection = (dbConfig) => {
    return new Promise((resolve, reject) => {
        logger.debug("Trying to connect to the mongo client "+dbConfig.name);
        if(!isMongoDConnected(dbConfig)){
            logger.error(errorConfig["MONGODB"]["MONGOD_NOT_CONNECTED"].message);
            reject(errorConfig["MONGODB"]["MONGOD_NOT_CONNECTED"]);
        }else{
            mongodb.connect(buildConnectionString(dbConfig), (err, client) => {
                if(err){    
                    logger.error(errorConfig["MONGODB"]["MONGODB_CLIENT_CONNECT_FAILED"].message);
                    reject(errorConfig["MONGODB"]["MONGODB_CLIENT_CONNECT_FAILED"]);
                }else{
                    logger.info("Successfully connected to the mongo client "+dbConfig.name);
                    MongoClientConnections.set(dbConfig.name, client);
                    api.connections.set(dbConfig.name, client);
                    resolve(true);
                }
            });
        }
    });
}

const startMongoDInstance = (dbConfig) => {
    return new Promise((resolve, reject) => {
        logger.debug("Trying to connect to the mongod instance for "+dbConfig.name);
        if(doesDataDirectoryExist(dbConfig)){
            if(isMongoDConnected(dbConfig)){
                resolve(true);
            }else{
                let server = new mongod({port:dbConfig.port, dbpath:dbConfig.path});
                server.open(err => {
                    if(err){
                        logger.error(errorConfig["MONGODB"]["MONGOD_SERVER_CONNECT_FAILED"].message, err);
                        reject(errorConfig["MONGODB"]["MONGOD_SERVER_CONNECT_FAILED"]);
                    }else{
                        logger.info("Successfully initialized mongod for "+dbConfig.name+" on port "+dbConfig.port);
                        MongoDConnections.set(dbConfig.name, server);
                        resolve(true);
                    }
                });
            }
        }else{
            logger.error(errorConfig["MONGODB"]["DATA_DIR_DOESNT_EXIST"].message);
            reject(errorConfig["MONGODB"]["DATA_DIR_DOESNT_EXIST"]);
        }
    });
}

const init = (dbConfig) => {
    return new Promise((resolve, reject) => {
        startMongoDInstance(dbConfig).then(success => {
            return startMongoClientConnection(dbConfig);
        }).then(success => {
            resolve(success);
        }).catch(error => {
            reject(error);
        });
    });
}

module.exports = {
    init,
    MongoDConnections,
    MongoClientConnections
}