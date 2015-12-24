/* GET users listing. */

var models = require('../models/models');
var util = require('../util');
var promise = require('bluebird');

module.exports = {
    generateMeetings: function (pTopic) {
        var lcMeetingsToCreate = [];

        for (var i = 0; i < 5000; i++) {
            var lcObjectModel = {
                topic: pTopic,
                members: [
                    'Patrick',
                    'Rudolf',
                    'Sebastian',
                    'Peter',
                    'Raphael',
                    'Lisa',
                    'Marie',
                    'Ramona',
                    'Angela',
                    'Jessica'
                ],
                starttime: new Date(),
                endtime: new Date()
            };
            lcMeetingsToCreate.push(lcObjectModel);
        }

        return new promise(function (resolve, reject) {
            models.meetings.collection.insert(lcMeetingsToCreate, function (err, docs) {
                if (err) {
                    return reject(err);
                }
                resolve();
            })
        });
    }
};