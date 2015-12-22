'use strict';

var mongoose = require('mongoose');

// Mongoose
var Promise = require('bluebird');
Promise.promisifyAll(mongoose);

var meetingSchema = require('./meeting.js');

// export the class
module.exports = {
    meetings: mongoose.model('Meetings', meetingSchema)
};
