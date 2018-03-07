/**
 * External libraries
 */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

/**
 * Internal helpers
 */
const socket = require('../socket/socket');
const routes = require('./routes.js');
const logger = new(require('../../../lib/logger'))('core/boradcaster/api/server.js');

/**
 * Configs
 */
const broadcasterConfig = require('../../../config/servers.json').broadcaster.api;


var app;

/**
 * @function start
 * @description Starts the Orderer server to listen on the port in @see broadcasterConfig.port
 */
const start = () => {
    logger.debug("*** Starting broadcaster API on port: "+broadcasterConfig.port+" ***");
    app = express();
    app.set('port', broadcasterConfig.port);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use('/', routes);

    app.listen(app.get('port'), "127.0.0.1");
    logger.info("*** Boradcaster listening on port: "+app.get('port')+" ***\n");

}


module.exports = {
    start:start
}