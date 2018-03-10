/**
 * External Lilbraries
 */
const fs = require('fs'), path = require('path');

/**
 * Internal Lilbraries
 */
const shared = require('./shared');

const src = path.join(__dirname, '../src/core/server');
const dist = path.join(__dirname, '../dist/server');

shared.preOperations(dist).then(success => {
    return shared.copyRequireFiles(src, src, dist);
});
//shared.copyRequireFiles(src, dist);

