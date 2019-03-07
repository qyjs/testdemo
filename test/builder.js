var basicFunc = require('../common/basic');
const config = require('../config/config');
const route = require('../route/route');

exports.buildPostmanCollection = function() {
    var postmanId = basicFunc.randomString(8).toLowerCase() +
        "-" + basicFunc.randomString(4).toLowerCase() +
        "-" + basicFunc.randomString(4).toLowerCase() +
        "-" + basicFunc.randomString(4).toLowerCase() +
        "-" + basicFunc.randomString(12).toLowerCase();

    var postmanObj = {
        "id": postmanId,
        "name": "LocalTest." + config.api_info.title,
        "description": "",
        "order": [],
        "folders": [],
        "folders_order": [],
        "timestamp": 1549076470222,
        "owner": 0,
        "public": false,
        "requests": []
    };

    route.forEach(function(element, index) {
        var id = basicFunc.randomString(8).toLowerCase() +
            "-" + basicFunc.randomString(4).toLowerCase() +
            "-" + basicFunc.randomString(4).toLowerCase() +
            "-" + basicFunc.randomString(4).toLowerCase() +
            "-" + basicFunc.randomString(12).toLowerCase();
        postmanObj["order"].push(id);

        var requestObj = {
            "id": id,
            "headers": "Content-Type: application/json\n",
            "headerData": [{
                "key": "Content-Type",
                "value": "application/json",
                "description": "",
                "enabled": true
            }],
            "url": "http://localhost:" + config.port + element.path,
            "queryParams": [],
            "pathVariables": {},
            "pathVariableData": [],
            "preRequestScript": null,
            "method": element.method.toUpperCase(),
            "collectionId": postmanId,
            "data": [],
            "dataMode": "raw",
            "name": "http://localhost:" + config.port + element.path,
            "description": "",
            "descriptionFormat": "html",
            "time": 1549076484154,
            "version": 2,
            "responses": [],
            "tests": null,
            "currentHelper": "normal",
            "helperAttributes": {},
        };
        if (element.requestBody != null) {
            var rawModeDataObj = basicFunc.requestBody2RawModeData(element.requestBody);
            requestObj["rawModeData"] = JSON.stringify(rawModeDataObj, null, "\t");
        }
        postmanObj["requests"].push(requestObj);
    });

    return JSON.stringify(postmanObj, null, "\t");
}