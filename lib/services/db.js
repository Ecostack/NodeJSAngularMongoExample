'use strict';

var mongoose = require('mongoose');

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost:27017/meetings';

var options = {
    db: {
        'native_parser': true
    },
    server: {
        poolSize: 10,
        'auto_reconnect': true
    }
};

options.server.socketOptions = {
    keepAlive: 1
};

var db = mongoose.connection;
db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});

db.on('connected', function() {
    console.log('db connected');
});



var connectWithRetry = function() {
    return mongoose.connect(uristring, options, function(err, res) {
        if (err) {
            console.error(
                'Failed to connect to mongo on startup - retrying in 5 sec',
                err);
            setTimeout(connectWithRetry, 5000);
        }
    });
};

module.exports = {
    connect: connectWithRetry
}
