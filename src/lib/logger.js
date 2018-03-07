const log4js = require('log4js');

const LEVEL = 'DEBUG';

module.exports = class logger {
    constructor(filename){
        this.filename = filename;
        this.logger = log4js.getLogger(this.filename);
        this.logger.level = LEVEL.toLowerCase();
    }

    debug(message){
        return this.logger.debug(message);
    }

    info(message){
        return this.logger.info(message);
    }

    warn(message){
        return this.logger.warn(message);
    }

    error(message){
        return this.logger.error(message);
    }

    fatal(message){
        return this.logger.fatal(message);
    }
}