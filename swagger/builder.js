const config = require('../config/config');
const route = require('../route/route');

function generatePropertieObject(item) {
    var propertieObject = {
        type: item.type
    };

    if (item.description != null) {
        propertieObject.description = item.description;
    }
    if (item.example != null) {
        propertieObject.example = item.example;
    }

    if (item.type == 'object') {
        propertieObject.properties = {};
        for (var name in item.properties) {
            propertieObject.properties[name] = generatePropertieObject(item.properties[name]);
        }
    } else if (item.type == 'array') {
        propertieObject.items = generatePropertieObject(item.items);
    }

    return propertieObject;
}

exports.buildSwagger = function() {
    var swaggerObj = {
        "swagger": "2.0",
        "info": {
            "description": config.api_info.title,
            "version": config.api_info.title + "." + config.api_info.version,
            "title": config.api_info.title + " API",
            "license": {
                "name": "Apache 2.0",
                "url": "http://www.apache.org/licenses/LICENSE-2.0"
            }
        },
        "host": config.api_info.title,
        "schemes": ["http"],
        "basePath": "/",
        "tags": [{
            "name": config.api_info.title + " controller",
            "description": "The auto generated web service swagger file"
        }],
        "x-ebao-auth-enabled": true,
        "x-ebao-cors-enabled": true,
        "x-ebao-cicd-mode": true,
        "paths": {},
        "definitions": {}
    };

    route.forEach(function(element, index) {
        //basic
        if (swaggerObj["paths"][element.path] == null) {
            swaggerObj["paths"][element.path] = {};
        }
        swaggerObj["paths"][element.path][element.method] = {};
        swaggerObj["paths"][element.path][element.method]["tags"] = [config.api_info.title + " controller"];
        if (element.summary != null) {
            swaggerObj["paths"][element.path][element.method]["summary"] = config.api_info.title + ' ' + element.summary;
        } else {
            swaggerObj["paths"][element.path][element.method]["summary"] = config.api_info.title + " API";
        }
        if (element.method.toUpperCase() == 'POST') {
            swaggerObj["paths"][element.path][element.method]["operationId"] = 'implUsingGET';
        } else {
            swaggerObj["paths"][element.path][element.method]["operationId"] = 'sendUsingPOST';
        }
        swaggerObj["paths"][element.path][element.method]["consumes"] = ["application/json"];
        swaggerObj["paths"][element.path][element.method]["produces"] = ["*/*"];
        //input
        if (element.requestBody != null) {
            var inputDefinitionsName = "RequestBody" + index;

            swaggerObj["paths"][element.path][element.method]["parameters"] = [{
                "in": "body",
                "name": "requestBody",
                "description": "requestBody",
                "required": true,
                "schema": {
                    "$ref": "#/definitions/" + inputDefinitionsName
                }
            }];

            swaggerObj["definitions"][inputDefinitionsName] = {
                "type": "object",
                "properties": {}
            };

            for (var name in element.requestBody) {
                swaggerObj["definitions"][inputDefinitionsName]["properties"][name] = generatePropertieObject(element.requestBody[name]);
            }
        } else {
            swaggerObj["paths"][element.path][element.method]["parameters"] = [];
        }
        //output
        var outputDefinitionsName = "ResponseBody" + index;
        swaggerObj["paths"][element.path][element.method]["responses"] = {
            "200": {
                "description": "OK",
                "schema": {
                    "$ref": "#/definitions/" + outputDefinitionsName
                }
            },
            "401": {
                "description": "Unauthorized"
            },
            "403": {
                "description": "Forbidden"
            },
            "404": {
                "description": "Not Found"
            }
        };
        if (element.responseBody != null) {
            swaggerObj["definitions"][outputDefinitionsName] = {
                "type": "object",
                "properties": {}
            };

            for (var name in element.responseBody) {
                swaggerObj["definitions"][outputDefinitionsName]["properties"][name] = generatePropertieObject(element.responseBody[name]);
            }
        } else {
            swaggerObj["definitions"][outputDefinitionsName] = {
                "type": "string",
                "description": "sample response body"
            };
        }
    });

    return JSON.stringify(swaggerObj, null, "\t");
}