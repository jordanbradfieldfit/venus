/**
 * External Libraries
 */
const net = require('net');

/**
 * Internal Libraries
 */
const logger = new(require('../../../lib/logger'))('core/peer/socket/server.js');

/**
 * Configs
 */
const broadcasterConfig = require('../../../config/servers.json').broadcaster;

var PEER_SOCKET;

const start = () => {
    logger.debug("*** Connected a client to the broadcasters server socket ***");
    PEER_SOCKET = net.Socket();

    PEER_SOCKET.connect(broadcasterConfig.socket.port, () => {
        console.log("Client connected")
        PEER_SOCKET.destroy();
    });
}

module.exports = {
    start
}