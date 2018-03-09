/**
 * Internal libs
 */
const uuid = require('../../../lib/uuid');
const logger = new(require('../../../lib/logger'))('core/broadcaster/controllers/socketController.js');

/**
 * Internal helpers
 */


/**
 * Configs
 */
const databaseConfig = require('../../../config/database.json').broadcaster;

const PEERS = [];

const filterRemoteAddress = (address) => {
    return address.indexOf(":") !== -1 ? address.split(":")[address.split(":").length - 1] : address;
}

const addNewPeer = (peer) => {
    logger.info("Welcoming new peer "+peer.ipAddress+":"+peer.port+" with UUID "+peer.uuid+" to the network.");
    return PEERS.push(peer);//add the peer to the peer array
}

const peerLeftNetwork = (peer) => {
    console.log(peer+"left")
}

module.exports = {
    filterRemoteAddress,
    addNewPeer,
    peerLeftNetwork
}