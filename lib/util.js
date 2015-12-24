'use strict';

var mongoose = require('mongoose');
var _ = require('lodash');
var Promise = require('bluebird');


String.prototype.toObjectId = function () {
    var ObjectId = (mongoose.Types.ObjectId);
    return new ObjectId(this.toString());
};

var sendStatus = function (pResponse, pStatus, pTerminate, pText) {
    if (pText != null) {
        pResponse.status(pStatus).json({
            'err': pText
        })
    } else {
        pResponse.status(pStatus);
    }
    if (pTerminate === true || pTerminate === undefined) {
        pResponse.end();
    }
};


module.exports = {
    asyncCatch: function (res) {
        return function (err) {
            module.exports.errorHandler(err, undefined, res);
        }
    },
    unpack: function (pValue) {
        var lcReturn = pValue;
        if (lcReturn && Array.isArray(lcReturn)) {
            if (lcReturn.length == 1) {
                lcReturn = lcReturn[0];
            }
        }
        return lcReturn;
    },

    errorHandler: function (err, req, res, next) {
        var lcErr = module.exports.unpack(err);
        var lcOnlyValidationErr = false;

        if (lcErr) {
            if (Array.isArray(lcErr)) {
                _.each(lcErr, function (pItem) {
                    if (pItem != undefined) {
                        console.log(pItem);
                        console.log(pItem.stack);
                    }
                });
                lcErr = lcErr.toString();
            } else {
                if (lcErr.name === 'ValidationError') {
                    lcOnlyValidationErr = true;
                }
                console.log(lcErr);
                console.log(lcErr.stack);
            }
            if (res) {
                if (lcOnlyValidationErr === true) {
                    res.status(400);
                } else {
                    res.status(500);
                }
                res.json({
                    'err': lcErr
                }).end();
            }
        }
    },
    httpStatus: {
        serverError: function (pResponse, pTerminate, pText) {
            sendStatus(pResponse, 500, pTerminate, pText);
        },
        badRequest: function (pResponse, pTerminate, pText) {
            sendStatus(pResponse, 400, pTerminate, pText);
        },
        notAuthorized: function (pResponse, pTerminate, pText) {
            sendStatus(pResponse, 401, pTerminate, pText);
        },
        ok: function (pResponse, pTerminate, pText) {
            sendStatus(pResponse, 200, pTerminate, pText);
        }
    }
};
