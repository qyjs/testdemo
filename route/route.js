exports = module.exports = [{
        method: 'get', //get post put delete
        path: '/api/run',
        impl: 'api.doGet',
        //api description info
        summary: 'api for get request',
        responseBody: {
            result: {
                type: 'boolean', //string integer number boolean array object
                description: 'api result',
                example: 'true'
            },
            message: {
                type: 'string', //string integer number boolean array object
                description: 'api return message',
                example: "OK"
            }
        }
    },
    {
        method: 'post', //get post put delete
        path: '/api/run',
        impl: 'api.doPost',
        //api description info
        summary: 'api for post request',
        requestBody: {
            userinfo: {
                type: 'object', //string integer number boolean array object
                description: 'user info',
                properties: {
                    username: {
                        type: 'string', //string integer number boolean array object
                        description: 'username',
                        example: "test"
                    },
                    password: {
                        type: 'string', //string integer number boolean array object
                        description: 'password',
                        example: "test"
                    }
                }
            },
            userList: {
                type: 'array',
                description: 'user info list',
                items: {
                    type: 'object',
                    description: 'user item',
                    properties: {
                        username: {
                            type: 'string', //string integer number boolean array object
                            description: 'username',
                            example: "test"
                        },
                        password: {
                            type: 'string', //string integer number boolean array object
                            description: 'password',
                            example: "test"
                        }
                    }
                }
            }
        },
        responseBody: {
            result: {
                type: 'boolean', //string integer number boolean array object
                description: 'api result',
                example: 'true'
            },
            message: {
                type: 'string', //string integer number boolean array object
                description: 'api return message',
                example: "OK"
            }
        }
    }
];