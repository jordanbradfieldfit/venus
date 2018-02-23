const connections = require('./connect').MongoClientConnections;

const databaseConfig = require('../../config/database.json');

const getDatabaseObject = (peer) => {
    return connections.get(databaseConfig[peer].name).db(databaseConfig[peer].name);
}

const getDatabaseCollection = (peer, collection) => {
    return getDatabaseObject(peer).collection(collection);
}

const findMany = (peer, collection, query) => {
    return new Promise((resolve, reject) => {

    });
}

const findOne = (peer, collection, query) => {
    return new Promise((resolve, reject) => {
        
    });
}

const updateMany = (peer, collection, query, data) => {
    return new Promise((resolve, reject) => {
        
    });
}

const updateOne = (peer, collection, query, data) => {
    return new Promise((resolve, reject) => {
        
    });
}

const insertMany = (peer,collection,  documents) => {
    return new Promise((resolve, reject) => {
        
    });
}

