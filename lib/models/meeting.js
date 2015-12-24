'use strict';

var mongoose = require('mongoose');

var meetingSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
        trim: true,
        validate: [function (value) {
            return value && value.length > 0 && value.length < 50;
        }, 'Invalid topic name']
    },
    members: [{
        type: String,
        required: true,
        trim: true,
        validate: [function (value) {
            return value && value.length > 0 && value.length < 50;
        }, 'Invalid member name']
    }],
    starttime: {
        type: Date,
        required: true
    },
    endtime: {
        type: Date,
        required: true
    }
});

meetingSchema.plugin(require('mongoose-timestamp'));

meetingSchema.pre('validate', function (next) {
    if (this.starttime > this.endtime) {
        return next('End time must be greater than start time');
    }
    if (this.members.length > 10) {
        return next('Maximum 10 members per meeting allowed');
    }
    return next();
});


module.exports = meetingSchema;
