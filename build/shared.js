/**
 * External Libraries
 */
const fs = require('fs'),
    path = require('path'),
    command = require('node-cmd');

const writeFileToDistIfNotExists = (readFrom, writeTo) => {
    if (!fs.existsSync(writeTo)) {
        fs.writeFileSync(writeTo, fs.readFileSync(readFrom).toString());
    }
}

const makeDirectoryInDistIfNotExists = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

const getRequiredFiles = (file) => {
    let contents = fs.readFileSync(file).toString();
    if(contents.indexOf('require') !== -1){
        console.log(file)
    }
}


/**
 * @exports
 */
exports.preOperations = (dist) => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(dist)) {
            command.get('rm -rf ' + dist, (stderr, stdout, out) => {
                resolve(fs.mkdirSync(dist));
            });
        } else {
            resolve(fs.mkdirSync(dist));
        }
    });
}

exports.copyRequireFiles = (startingPath, nextDirectory, dist) => {
    let requireFiles = [];
    let copy = (startingPath, nextDirectory, dist) => {
        let files = fs.readdirSync(nextDirectory),
            i = 0,
            amount = files.length;
        for (; i < amount; i++) {
            let artifact = path.join(nextDirectory, files[i]),
                stats = fs.lstatSync(artifact),
                relative = path.relative(startingPath, artifact);
            if (stats.isDirectory()) {
                makeDirectoryInDistIfNotExists(path.join(dist, relative));
                exports.copyRequireFiles(startingPath, artifact, dist);
            } else {
                let requiredFiles = getRequiredFiles(artifact);
                if(requiredFiles && requiredFiles.length > 0){
                    console.log(requiredFiles);
                }
                writeFileToDistIfNotExists(artifact, path.join(dist, relative))
            }
        }
    }
    copy(startingPath, nextDirectory, dist);
}

exports.getFileRequires