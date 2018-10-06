'use strict';

module.exports = () => {

    return function (request, h) {

        if (request.auth.isAuthenticated) {

            return h.redirect('/');
        }

        let message = '';
        let account = null;

        console.log(request.payload);
        if (request.method === 'post') {
            if (!request.payload.username || !request.payload.password) {
                message = 'Missing username or password';
            }
            else {
                // Check User And Password on Database
            }
        }

        return h.file('login.html');
    };
};
