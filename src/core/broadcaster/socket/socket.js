/**
 * External libraries
 */
const net = require('net');

/**
 * Internal libs
 */
const logger = new(require('../../../lib/logger'))('core/broadcaster/socket/server.js');
const uuid = require('../../../lib/uuid');

/**
 * Internal helpers
 */
const socketController = require('../controllers/socketController');

/**
 * Configs
 */
const broadcasterConfig = require('../../../config/servers.json').broadcaster.socket;

var SOCKET_SERVER;

const start = () => {
    logger.debug("*** Staring the broadcaster socket server on port "+broadcasterConfig.port+" ***");
    //create the socket server to listen for peer connections
    SOCKET_SERVER = net.createServer(socket => {
        let ipAddress = socketController.filterRemoteAddress(socket.remoteAddress), port = socket.remotePort, ipVersion = socket.remoteFamily;
    
        //add the new peer to the peers in the socketController
        socketController.addNewPeer({ipAddress, port, ipVersion, socket, uuid:uuid.generate()});
    
    }).listen(broadcasterConfig.port, () => {
        logger.info("*** Started broadcaster socket successfully ***\n");
    });
}

module.exports = {
    start
};