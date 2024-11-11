/* Establish the DB connection pool here. */
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const config = {
    connectionString: process.env.CONNECTION_STRING
};
export const pool = new pg.Pool(config);

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Database connected:', res.rows[0].now); // Logs the current date and time
    }
});