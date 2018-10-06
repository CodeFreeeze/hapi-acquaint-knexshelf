'use strict';

module.exports = [
    {
        path: '/login',
        method: 'GET',
        options: {
            auth: { mode: 'try' },
            plugins: {
                errorh: false,
                crumb: { restful: false },
                'hapi-auth-cookie': { redirectTo: false }
            }
        },
        handler: (request, h) => {
            // (request, h) is the original function but since h is not in use in current  func, we will remove request, h
            return h.file('login.html').header('x-csrf-token', request.server.plugins.crumb.generate(request, h));

            // const message = '';
            // return '<html><head><title>Login page</title></head><body>' +
            //     (message ? '<h3>' + message + '</h3><br/>' : '') +
            //     '<form method="post" action="/login">' +
            //     'Username: <input type="text" name="username"><br>' +
            //     'Password: <input type="password" name="password"><br/>' +
            //     '<input type="submit" value="Login"></form></body></html>';
        }
    },
    {
        path: '/login',
        method: 'POST',
        options: {
            auth: { mode: 'try' },
            plugins: {
                errorh: false,
                crumb: { restful: false },
                'hapi-auth-cookie': { redirectTo: false }
            },
            handler: {
                login: {}
            }
        }


    }
];
