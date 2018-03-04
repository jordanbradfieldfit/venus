const command = require('./lib/command');

const databaseConnect = require('./core/database/connect');

const databaseConfig = require('./config/database.json');
const mockConfig = require('./config/mock.json');

// command.execute('rm -rf /data/*').then(success => {
//     return Promise.all(Object.keys(databaseConfig).map(db => {
//         return databaseConnect.init(databaseConfig[db]);
//     }));
// }).then(success => {
//     databaseConfig
// })