'use strict';

module.exports = [
    {
        name: 'profileTable',
        protoProps: {
            tableName: 'user_profile',
            withUpdatedAt: true
        },
        columns: (table) => {

            table.string('username').notNullable();
            table.string('password').notNullable();
            table.string('first_name');
            table.string('last_name');
            table.string('middle_name');
            table.string('birth_date');
        },
    }

];
