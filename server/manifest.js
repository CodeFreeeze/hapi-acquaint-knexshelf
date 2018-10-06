'use strict';

const Confidence = require('confidence');

const internals = {
    defaults: {
        db: process.env.DB,
        // $lab:coverage:off$
        port: process.env.PORT || 8888,
        connectionString: process.env.POSTGRES || 'postgres://hapitodo:hapitodo@localhost/hapitodo'
        // $lab:coverage:on$
    },
    errorhOptions: {
        errorFiles: {
            401: '401.html',
            404: '404.html',
            default: '50x.html'
        },
        staticRoute: {
            method: '*',
            path: '/{path*}',
            handler: {
                directory: {
                    path: './',
                    index: true,
                    listing: true,
                    redirectToSlash: true
                }
            },
            options: {
                auth: false,
                plugins: {
                    blankie: false,
                    errorh: false,
                    'hapi-auth-cookie': { redirectTo: false },
                    crumb: { restful: false }
                }
            }
        }
    }
};

const skip = (request) => {
    return true;
    // return request.headers['x-api-token'] === 'test';
};

// `${process.cwd()}/static`
const store = new Confidence.Store({
    server: {
        port: 8000,
        routes: { files: { relativeTo: `${process.cwd()}/static`} },
        router: {
            isCaseSensitive: false,
            stripTrailingSlash: true
        }
    },
    register: {
        plugins: [
            'inert',
            'scooter',
            'blankie',
            'hapi-auth-basic',
            'hapi-auth-cookie',
            'hapi-auth-hawk',
            'scarecrow',
            {
                plugin: require('./sessionChecker'),
                options: {
                    redirectPage: 'login'
                }
            },
            {
                plugin: 'errorh',
                options: internals.errorhOptions
            },
            {
                plugin: 'crumb',
                options: {
                    skip,
                    restful: true
                }
            },
            {
                plugin: 'good',
                options: {
                    ops: { interval: 3600 * 1000 },
                    reporters: {
                        console: [
                            {
                                module: 'good-squeeze',
                                name: 'Squeeze',
                                args: [{ ops: '*', log: '*', error: '*', response: '*' }]
                            },
                            { module: 'good-console' },
                            'stdout'
                        ]
                    }
                }
            },
            {
                plugin: require('./ozAuthSetup')
            },
            {
                plugin: require('acquaint'),
                options: {
                    routes: [{ includes: ['server/route/**/*.js'] }],
                    handlers: [{ includes: ['server/handler/**/*.js'] }],
                    methods: [{ includes: ['server/method/**/*.js'] }]
                }
            }
        ]
    }
});


exports.defaults = internals.defaults;


exports.errorhOptions = internals.errorhOptions;


exports.get = (key, criteria) => {

    return store.get(key, criteria || internals.defaults);
};
