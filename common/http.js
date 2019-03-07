var http = require('sync-request');

exports.get = function(url, params, headers) {
    var response = request('GET', url, params, headers);
    return response;
}

exports.post = function(url, params, headers) {
    var response = request('POST', url, params, headers);
    return response;
}

function request(method, url, params, headers) {
    //default
    params = params || {};
    headers = headers || {};

    var params_str = '';
    if (method == 'GET') {
        if (params.length > 0) {
            params_str += '?';
            for (var key in params) {
                params_str += key + '=' + params[key] + '&';
            }
            params_str = params_str.substring(0, params_str.length - 1);
        }

        var options = {
            headers: headers
        };

        console.log('GET', url + params_str, options);
        var response = http('GET', url + params_str, options);
        if (response.statusCode == 200) {
            return { result: true, data: response.getBody() };
        } else {
            console.log('ERROR RESPONSE', response);
            return { result: false, err: response.statusCode };
        }
    } else {
        if (params instanceof String) {
            var options = {
                headers: headers,
                body: params
            };
        } else {
            var options = {
                headers: headers,
                json: params
            };
        }

        console.log('POST', url, options);
        var response = http('POST', url, options);
        if (response.statusCode == 200) {
            return { result: true, data: response.getBody() };
        } else {
            console.log('ERROR RESPONSE', response);
            return { result: false, statusCode: response.statusCode };
        }
    }
}