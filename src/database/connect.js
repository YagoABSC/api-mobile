let knex = require('knex')(
    {
        client: 'mysql2',
        connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'todolist_uc14'
        }
});
 
module.exports = knex;