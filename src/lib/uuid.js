const segments = 8;
const segmentLength = 8;
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const useSeperator = false;

/**
 * @function generateNumber
 * @description Generates a random whole number with a max based on the passed param
 * @param {Number} max 
 * @return {Number} A random whole number
 */
const generateNumber = (max) => {
    return Math.floor(Math.random() * max);
}

/**
 * @function generateSegment
 * @description Generates a segment of random letters and numbers with a length based off of @see segmentLength
 * @return {String} A string with randomly ordered random letters and numbers
 */
const generateSegment = () => {
    let segment = "", i = 0;
    for(; i < segmentLength; i++){
        let letterOrAlphabet = generateNumber(2) === 1 ? alphabet[generateNumber(alphabet.length)] : generateNumber(10);
        segment+=letterOrAlphabet;
    }
    return useSeperator ? segment+"-" : segment;
}

/**
 * @function generate
 * @description Generates a random unique id with different dash (optional) seperated segments @see segments for the amount of segments
 * @return {String} A random unique ID string
 */
const generate = () => {
    let uuid = "", i = 0;
    for(; i < segments; i++){
        uuid+=generateSegment();
    }
    return useSeperator ? uuid.substring(0, uuid.length - 1) : uuid;
}


module.exports = {
    generate:generate
}