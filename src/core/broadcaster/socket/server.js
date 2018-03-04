/**
 * External libraries
 */
const net = require('net');

/**
 * Internal helpers
 */
const socketController = require('../controllers/socketController');
const logger = require('../../../lib/logger').getLogger('core/broadcaster/socket/server.js', 'DEBUG');

/**
 * Configs
 */
const broadcasterConfig = require('../../../config/servers.json').broadcaster;

const clients = [];

const server = net.createServer(socket => {

    let ipAddress = socketController.filterRemoteAddress(socket.remoteAddress), port = socket.remotePort, ipVersion = socket.remoteFamily;

    logger.info("Welcoming new peer from "+ipAddress+":"+port+" using internet protocol version "+ipVersion);

    clients.push({ipAddress, port, ipVersion, socket});

}).listen(broadcasterConfig.port, () => {
    logger.debug("*** Staring the broadcast socket server ***\n")
});