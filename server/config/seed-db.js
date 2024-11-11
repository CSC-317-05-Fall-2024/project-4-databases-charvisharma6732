/* Initialize the data in the DB */
import { pool } from './database.js';

const dropTables = async () => {
    try {
        const dropTablesQuery = `
            DROP TABLE IF EXISTS restaurants;
        `;
        await pool.query(dropTablesQuery);
    } catch (error) {
        console.log("Error dropping tables", error);
    }
}

const createTables = async () => {
    try {
        const createTablesQuery = `
        CREATE TABLE IF NOT EXISTS restaurants (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            address VARCHAR(200) NOT NULL,
            photo VARCHAR(200) NOT NULL
        );
    `;
    await pool.query(createTablesQuery);
    } catch (error) {
        console.log("Error creating table", error);
    }
}

const insertData = async () => {
    try {
        const insertDataQuery = `
            INSERT INTO restaurants (name, phone, address, photo) VALUES
            ($1, $2, $3, $4),
            ($5, $6, $7, $8),
            ($9, $10, $11, $12),
            ($13, $14, $15, $16),
            ($17, $18, $19, $20),
            ($21, $22, $23, $24)
            ON CONFLICT DO NOTHING;
        `;

        const values = [
            'Hali\'imaile', '(945)-222-8764', '666 Cherry Road', 'images/restaurant1.jpeg',
            'Lahaina Grill', '(945)-828-7413', '826 Moa Street', 'images/restaurant2.jpeg',
            'Kama\'s Fish', '(970)-286-3947', '84 Wethel Road', 'images/restaurant3.jpeg',
            'Nalau\'s House', '(918)-554-3903', '9244 Choka Drive', 'images/restaurant4.jpeg',
            'South Shore Grill', '(901)-851-1630', '9670 Shoko Street', 'images/restaurant5.jpeg',
            'Kimo Kapalua', '(931)-878-6541', '826 Fellows Road', 'images/restaurant6.jpeg'
        ];

        await pool.query(insertDataQuery, values);
    } catch (error) {
        console.log("Error inserting data:", error);
    }
}

const setup = async () => {
    await dropTables();
    await createTables();
    await insertData();
    console.log("Database setup finished");
}

setup();
