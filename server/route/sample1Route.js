'use strict';

module.exports = [
    {
        path: '/test1',
        method: 'GET',
        // options: {
        //     auth: 'simple',
        //     plugins: {
        //         errorh: false,
        //         crumb: { restful: false }
        //     }
        // },
        handler: () => {
            // (request, h) is the original function but since h is not in use in current  func, we will remove request, h
            return 'hello pass auth';
        }
    }
];
