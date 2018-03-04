const connections = new Map();

const databaseConfig = require('../../config/database.json');

const getDatabaseObject = (peer) => {
    return connections.get(databaseConfig[peer].name).db(databaseConfig[peer].name);
}

const getDatabaseCollection = (peer, collection) => {
    return getDatabaseObject(peer).collection(collection);
}

const findAll = (peer, collection) => {
    return new Promise((resolve, reject) => {
        getDatabaseCollection(peer, collection).find({}).toArray((err, result) => {
            if(err){

            }else{
                resolve(result);
            }
        });
    });
}

const findMany = (peer, collection, query) => {
    return new Promise((resolve, reject) => {
        getDatabaseCollection(peer, collection).find(query).toArray((err, result) => {
            if(err){

            }else{
                resolve(result);
            }
        });
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

const findInMultipleCollections = (peer, collections) => {
    return new Promise((resolve, reject) => {
        Promise.all(collections.map(collection => {
            return findAll(peer, collection);
        })).then(results => {
            resolve(results);
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports = {
    connections,
    findMany,
    findOne,
    updateMany,
    updateOne,
    insertMany
}
