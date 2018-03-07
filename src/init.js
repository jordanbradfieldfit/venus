const command = require('./lib/command');

const broadcasterApi = require('./core/broadcaster/api/server');
const broadcasterSocket = require('./core/broadcaster/socket/socket');

broadcasterApi.start();
broadcasterSocket.start();

// command.execute('rm -rf /data/*').then(success => {
//     return Promise.all(Object.keys(databaseConfig).map(db => {
//         return databaseConnect.init(databaseConfig[db]);
//     }));
// }).then(success => {
//     databaseConfig
// })