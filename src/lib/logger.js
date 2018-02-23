const logger = require('log4js');

/**
 * @function getLogger
 * @description Returns an instance of the log4js class logging with the provided level and specifying the filename.
 * @param {String} filename Name of the file requesting the logger service
 * @param {String} level Requested log level ex. DEBUG
 * @return {Logger} An instance of the logger class
 */
const getLogger = (filename, level) => {
    let newLogger = logger.getLogger(filename);
    newLogger.level = level ? level : 'DEBUG';
    return newLogger;
}


module.exports = {
    getLogger:getLogger
}