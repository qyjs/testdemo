var express = require('express');
var bodyParser = require('body-parser');
var controller = require('./controller');

const config = require('./config/config');
const route = require('./route/route');
const swaggerBuilder = require('./swagger/builder');
const testBuilder = require('./test/builder');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


route.forEach(element => {
    console.log(element);
    var tuple = element.impl.split('.');
    var method = element.method.toUpperCase();
    if (method == 'GET') {
        app.get(element.path, controller[tuple[0]][tuple[1]]);
    } else if (method == 'POST') {
        app.post(element.path, controller[tuple[0]][tuple[1]]);
    } else if (method == 'PUT') {
        app.put(element.path, controller[tuple[0]][tuple[1]]);
    } else if (method == 'DELETE') {
        app.delete(element.path, controller[tuple[0]][tuple[1]]);
    }
});

app.listen(config.port);
console.log(`Server running at port ${config.port}`);

//swagger
var swaggerFileContent = swaggerBuilder.buildSwagger();
app.get('/swagger.json', function(req, res) {
    res.send(swaggerFileContent);
});

//localtest
var postmanFileContent = testBuilder.buildPostmanCollection();
app.get('/localtest.json', function(req, res) {
    res.send(postmanFileContent);
});