

import { pool } from '../config/database.js';

// Get a list of all restaurants
export const getRestaurants = async () => {
    try {
        const result = await pool.query('SELECT * FROM restaurants');
        return result.rows;
    } catch (error) {
        console.error("Error getting restaurants", error);
        throw error;
    }
};

// Get details for a specific restaurant by ID
export const getRestaurant = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM restaurants WHERE id = $1', [id]);
        return result.rows[0] || null;
    } catch (error) {
        console.error(`Error getting restaurant with ID ${id}:`, error);
        throw error;
    }
};

// Create a new restaurant entry
export const createRestaurant = async (newRestaurant) => {
    const { name, phone, address, photo } = newRestaurant;
    try {
        const result = await pool.query(
            'INSERT INTO restaurants (name, phone, address, photo) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, phone, address, photo]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error creating restaurant", error);
        throw error;
    }
};

// Delete a restaurant by ID
export const deleteRestaurant = async (id) => {
    try {
        const result = await pool.query('DELETE FROM restaurants WHERE id = $1 RETURNING *', [id]);
        return result.rowCount > 0;  // Returns true if a row was deleted
    } catch (error) {
        console.error(`Error deleting restaurant with ID ${id}:`, error);
        throw error;
    }
};