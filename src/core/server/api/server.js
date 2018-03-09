/**
 * External libraries
 */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

/**
 * Internal Libraries
 */
const logger = new(require('../../../lib/logger'))('core/server/server.js');

/**
 * Internal Helpers
 */
const routes = require('./routes.js');

/**
 * Configs
 */
const serverConfig = require('../../../config/servers.json').server;

var server;

/**
 * @function start
 * @description Starts the main express server to listen on the port in @see serverConfig.port this is http:// entry point to use
 * the venus application.
 */
const start = () => {
    logger.debug("Starting main Server on port: "+serverConfig.port);
    server = express();
    server.set('port', serverConfig.port);
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(cookieParser());
    server.use('/', routes);

    server.listen(server.get('port'), "127.0.0.1");
    logger.info("*** Server listening on port: "+server.get('port') + "*** \n");
}


module.exports = {
    start
}