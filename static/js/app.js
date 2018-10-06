'use strict';

jQuery(($) => {
    const internals = {
        ESCAPE_KEY: 27,
        ENTER_KEY: 13,
        REST_API: '/login',
        crumb: null
    };

    $(document).ajaxSend((e, xhr) => {

        if (internals.crumb) {
            xhr.setRequestHeader('x-csrf-token', internals.crumb);
        }
    });

    $(document).ajaxSuccess((e, xhr) => {
        const csrf = xhr.getResponseHeader('x-csrf-token');

        if (csrf) {
            internals.crumb = csrf;
        }
    });

    // $('#login-form').submit(function (callback, xhr) {
    //
    //     //$.ajax(internals.REST_API, { data: todo, method: 'put' })
    //     //$.post(internals.REST_API, todo).always(next);
    //     return true;
    // });
});
