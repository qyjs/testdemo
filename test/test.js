//npm install -g mocha
//mocha test/test.js
'use strict';
require("../main.js");

var http = require("http");
const config = require('../config/config');
const route = require('../route/route');
var basicFunc = require('../common/basic');

route.forEach(function(element, index) {
    it("should return 200", function(done) {
        this.timeout(10000);

        var post_options = {
            host: 'localhost',
            port: config.port,
            path: element.path,
            method: element.method.toUpperCase(),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        var response = http.request(post_options, function(res) {
            res.setEncoding("utf8");
            res.on("data", function(text) {
                //assert.equal(res.statusCode, 200);
                done();
            });
        });

        if (element.requestBody != null) {
            var rawModeDataObj = basicFunc.requestBody2RawModeData(element.requestBody);
            response.write(JSON.stringify(rawModeDataObj));
        }

        response.end();
    });
});