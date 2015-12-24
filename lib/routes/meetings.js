var express = require('express');
var router = express.Router();
var models = require('../models/models');
var util = require('../util');
var meetingService = require('../services/meetingService');

/* GET users listing. */
router.get('/', function (req, res, next) {
    // TODO read all meetings
    res.send('todo');
});

router.get('/totalcount', function (req, res, next) {
    models.meetings.countAsync().then(function(pResults) {
        res.json(pResults).end();
    }).catch(util.asyncCatch(res));
});

router.get('/upcoming', function (req, res, next) {
    // TODO
    models.meetings.countAsync().then(function(pResults) {
        res.json(pResults).end();
    }).catch(util.asyncCatch(res));
});

router.get('/averageAmountUpcoming', function (req, res, next) {
    // TODO
    models.meetings.countAsync().then(function(pResults) {
        res.json(pResults).end();
    }).catch(util.asyncCatch(res));
});

router.get('/nextDateForPerson/:name', function (req, res, next) {
    // TODO
    models.meetings.countAsync().then(function(pResults) {
        res.json(pResults).end();
    }).catch(util.asyncCatch(res));
});




router.post('/generateMeetings', function (req, res, next) {
    // TODO call service and so on..
    if (req.body.topic == null) {
        //  TODO send bad request
        return util.httpStatus.badRequest(res);
    }

    meetingService.generateMeetings(req.body.topic).then(function() {
        res.send('successfull');
    }).catch(util.asyncCatch(res));
});

module.exports = router;
