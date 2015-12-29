/* GET users listing. */

var models = require('../models/models');
var util = require('../util');
var promise = require('bluebird');
var _ = require('lodash');

var lcMembers = ['Patrick',
    'Rudolf',
    'Sebastian',
    'Peter',
    'Raphael',
    'Lisa',
    'Marie',
    'Ramona',
    'Angela',
    'Jessica'];

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getMembers() {
    var lcReturn = [];

    var lcIndexesAlreadyUsed = {};

    var lcHowMany = Math.floor((Math.random() * 10) + 1);

    for (var i = 0; i < lcHowMany; i++) {
        var lcIndex = Math.floor((Math.random() * 10) + 1);
        while (lcIndexesAlreadyUsed[lcIndex] == true) {
            lcIndex = Math.floor((Math.random() * 10) + 1);
        }
        lcIndexesAlreadyUsed[lcIndex] = true;
        lcReturn.push(lcMembers[lcIndex - 1]);
    }

    return lcReturn;
}

function createStartTime() {
    return randomDate(new Date(2010, 0, 1), new Date(2020, 0, 1));
}

function createEndTime(pStartTime) {
    var lcDiff = Math.floor((Math.random() * 8 * 60) + 1);
    var lcEndDate = new Date(pStartTime.getTime());

    lcEndDate.setMinutes(lcEndDate.getMinutes() + lcDiff);
    return lcEndDate;
}

function calculateAverageAmountOfMembers(pMeetings) {
    var lcMemberCount = 0;

    _.each(pMeetings, function (pMeeting) {
        lcMemberCount += pMeeting.members.length;
    });

    return lcMemberCount / pMeetings.length;
}

function createMeetingObject(pTopic) {
    var lcStartDate = createStartTime();
    var lcEndDate = createEndTime(lcStartDate);
    var lcObjectModel = {
        topic: pTopic,
        members: getMembers(),
        starttime: lcStartDate,
        endtime: lcEndDate
    };

    return lcObjectModel;
}

module.exports = {
    generateMeetings: function (pTopic) {
        var lcMeetingsToCreate = [];

        for (var i = 0; i < 5000; i++) {
            lcMeetingsToCreate.push(createMeetingObject(pTopic));
        }

        return new promise(function (resolve, reject) {
            models.meetings.collection.insert(lcMeetingsToCreate, function (err, docs) {
                if (err) {
                    return reject(err);
                }
                resolve();
            })
        });
    },
    getUpcomingMeetings: function () {
        return models.meetings.find(
            {
                starttime: {$gte: new Date()}
            }).
        limit(5).
        sort({starttime: 1}).
        execAsync()
    },
    getAverageAmountOfUpcomingMeetings: function () {
        return models.meetings.find(
            {
                starttime: {$gte: new Date()}
            }).
        limit(20).
        sort({starttime: 1}).select('members').
        execAsync().then(function (pResults) {
            return calculateAverageAmountOfMembers(pResults);
        })
    },
    getDateOfEachPerson: function () {
        var lcPromises = [];

        _.each(lcMembers, function (pMember) {
            lcPromises.push(models.meetings.find(
                {
                    starttime: {$gte: new Date()},
                    members: {
                        $in: [pMember]
                    }
                }).limit(1).sort({starttime: 1}).execAsync().then(function (pResult) {
                var lcReturn = {name: pMember};


                if (pResult.length > 0) {
                    lcReturn.starttime = pResult[0].starttime;
                }

                return lcReturn;
            }));
        });

        return promise.all(lcPromises).then(function (pResults) {
            return pResults;
        })
    }
};