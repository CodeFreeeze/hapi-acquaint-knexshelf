'use strict';

const Composer = require('./server/composer');

const startServer = async function () {

    Composer.then((server) => {

        server.start();

        return server;
    }).then((server) => {

        console.log(`Server running at: ${server.info.uri}`);
    }).catch((err) => {

        console.error(err);
        process.exit(1);
    });
};

startServer().then();
