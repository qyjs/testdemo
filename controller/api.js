var http = require('../common/http');
/**
 * api for get request
 * @route GET /api/run
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
exports.doGet = function(req, res) {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.send({ result: true, message: 'ok' });
};

/**
 * api for post request
 * @route POST /api/run
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
exports.doPost = function(req, res) {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.send({ result: true, message: 'ok' });
};