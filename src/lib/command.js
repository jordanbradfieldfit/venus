/**
 * @external libraries
 */
const cmd = require('node-cmd');

const logger = require('./logger').getLogger('lib/helpers/command.js', 'debug');

const errors = require('../config/errors.json');

/**
 * @function execute
 * @param {String} command 
 * @description Takes a command as a parameter and executes it as a child process using at @see node-cmd
 * @return {Promise} Resolved with data from the process if the command worked fine, rejected with an error if their was an error
 */
const execute = (command) => {
    return new Promise((resolve, reject) => {
        cmd.get(command, (err, stdout, stderr) => {
            if(err){
                logger.error(errors["EXTERNAL_COMMAND"]["EXTERNAL_COMMAND_ERROR"].message, stderr);
                reject(errors["EXTERNAL_COMMAND"]["EXTERNAL_COMMAND_ERROR"]);
            }else{
                resolve(stdout);
            }
        });
    });
}

module.exports = {
    execute:execute
}



