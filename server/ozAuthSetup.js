'use strict';

const Boom = require('boom');
const Oz = require('oz');

const internals = {};

internals.credentials = {
    john: {
        cred: {
            id: 'john',
            key: 'werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn',
            algorithm: 'sha256'
        }
    },
    jane: {
        err: Boom.internal('boom')
    },
    joan: {
        cred: {
            id: 'joan',
            key: 'werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn',
            algorithm: 'sha256'
        }
    }
};

exports.plugin = {
    name: 'authorization',
    version: '1.0.0',
    register: (server, options) => {

        // const getCredentialsFunc = (id) => {
        //
        //     if (internals.credentials[id]) {
        //         if (internals.credentials[id].err) {
        //             throw internals.credentials[id].err;
        //         }
        //         return internals.credentials[id].cred;
        //     }
        // };
        //
        // const hawkHeader = (id, path) => {
        //
        //     if (internals.credentials[id] && internals.credentials[id].cred) {
        //         return Hawk.client.header('http://example.com:8080' + path, 'POST', { credentials: credentials[id].cred });
        //     }
        //     return '';
        // };
        //
        // server.auth.strategy('default', 'hawk', { getCredentialsFunc });


    }
};
