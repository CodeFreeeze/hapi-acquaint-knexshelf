'use strict';

const Boom = require('boom');
const internals = {};


exports.plugin = {
    name: 'session_checker',
    version: '1.0.0',
    register: (server, options) => {

        const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
        server.app.cache = cache;

        server.auth.strategy('session', 'cookie', {
            password: 'password-should-be-32-characters',
            cookie: 'sid-cookie',
            redirectTo: options.redirectPage,
            isSecure: false,
            validateFunc: async (request, session) => {

                const cached = await cache.get(session.sid);
                const out = {
                    valid: Boolean(cached)
                };

                if (out.valid) {
                    out.credentials = cached.account;
                }

                return out;
            }
        });

        server.auth.default('session');


    }
};
