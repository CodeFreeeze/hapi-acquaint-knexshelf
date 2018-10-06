'use strict';

module.exports = [
    {
        path: '/',
        method: 'GET',
        // options: {
        //     auth: 'simple',
        //     plugins: {
        //         errorh: false,
        //         crumb: { restful: false }
        //     }
        // },
        handler: (request, h) => {
            // (request, h) is the original function but since h is not in use in current  func, we will remove request, h
            return h.file('home.html');
        }
    }
];
