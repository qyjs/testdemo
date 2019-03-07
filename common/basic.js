exports.randomString = function(len) {
    len = len || 32;
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function generateRawObject(item) {
    if (item.type == 'string') {
        if (item.example != null) {
            return item.example;
        }
        return "";
    } else if (item.type == 'integer') {
        if (item.example != null) {
            return item.example;
        }
        return 0;
    } else if (item.type == 'number') {
        if (item.example != null) {
            return item.example;
        }
        return 0;
    } else if (item.type == 'boolean') {
        if (item.example != null) {
            return item.example;
        }
        return "true";
    } else if (item.type == 'array') {
        var arrayData = [];
        arrayData.push(generateRawObject(item.items));
        return arrayData;
    } else if (item.type == 'object') {
        var objData = {};
        for (var name in item.properties) {
            objData[name] = generateRawObject(item.properties[name]);
        }
        return objData;
    }
    return "";
}

exports.requestBody2RawModeData = function(item) {
    var rawModeData = {};

    for (var name in item) {
        rawModeData[name] = generateRawObject(item[name]);
    }

    return rawModeData;
}