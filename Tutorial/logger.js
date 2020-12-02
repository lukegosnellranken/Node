var url = 'http://mylogger.io/log';

function log(message) {
    //Send an http request
    console.log(message);
}

//Exports whole object
//module.exports.log = log;

// Exports just the log function, not whole object
module.exports = log;
//module.exports.endPoint = url;

console.log(__filename);
console.log(__dirname);