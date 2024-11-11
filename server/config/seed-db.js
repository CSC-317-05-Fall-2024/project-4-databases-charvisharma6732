/* Initialize the data in the DB */
import { pool } from './database.js';

const dropTables = async () => {
    try {
        const dropReviewsTableQuery = `
        DROP TABLE IF EXISTS restaurants;
    `;
        const dropRestaurantsTableQuery = `
            DROP TABLE IF EXISTS restaurants;
        `;
        await pool.query(dropReviewsTableQuery);
        await pool.query(dropRestaurantsTableQuery);

    } catch (error) {
        console.log("Error dropping tables", error);
    }
}

const createTables = async () => {
    try {
        const createRestaurantsTableQuery = `
        CREATE TABLE IF NOT EXISTS restaurants (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            address VARCHAR(200) NOT NULL,
            photo VARCHAR(200) NOT NULL
        );`

        const createReviewsTableQuery = `
        CREATE TABLE IF NOT EXISTS reviews (
            id SERIAL PRIMARY KEY,
            rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
            content TEXT,
            restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE
        
        );
        
    `;
    await pool.query(createRestaurantsTableQuery);
    await pool.query(createReviewsTableQuery);
    } catch (error) {
        console.log("Error creating table", error);
    }
}

const insertData = async () => {
    try {
        const restaurantInsertDataQuery = `
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
        await pool.query(restaurantInsertDataQuery, values);

        const reviewInsertQuery = `
        INSERT INTO reviews (rating, content, restaurant_id) VALUES 
        (5, 'Amazing food and atmosphere!', 1),
        (4, 'Great service and tasty dishes.', 1),
        (3, 'Good food but a bit pricey.', 2),
        (5, 'Absolutely loved it! Highly recommended.', 2);
    `;
        await pool.query(reviewInsertQuery);
    } catch (error) {
        console.log("Error inserting data:", error);
    }
}

const setup = async () => {
    await dropTables();
    await createTables();
    await insertData();
    console.log("Database setup properly");
}

setup();
