import express from 'express';
import { deleteRestaurant, getRestaurants, createRestaurant, getRestaurant} from '../data/restaurants.js';
const router = express.Router();

//Get All Restaurants
router.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await getRestaurants();
        res.json(restaurants);
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.status(500).send('Internal Server Error');
    }
});

//Get Restaurant by ID
router.get('/restaurants/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const restaurant = await getRestaurant(parseInt(id));
        if (restaurant) {
            res.json(restaurant);
        } else {
            res.status(404).send('Restaurant not found');
        }
    } catch (error) {
        console.error('Error fetching restaurant:', error);
        res.status(500).send('Internal Server Error');
    }
});

//Post New Restaurant
router.post('/restaurants', async (req, res) => {
    const newRestaurant = req.body;
    console.log("Received data:", req.body); 

    if (newRestaurant && newRestaurant.name && newRestaurant.phone && newRestaurant.address) {
        try {
            const restaurant = await createRestaurant(newRestaurant);
            res.status(201).json(restaurant);
        } catch (error) {
            console.error('Error creating restaurant:', error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(400).json({ error: 'Missing required restaurant information' });
    }
});

//Delete Restaurant
router.delete('/restaurants/:id', async (req, res) => {
    const ID = parseInt(req.params.id);
    try {
        const deleted = await deleteRestaurant(ID);
        console.log("Deleted data:", deleted);

        if (deleted) {
            res.json({ message: 'Restaurant deleted' });
        } else {
            res.status(404).json({ error: 'Restaurant not found' });
        }
    } catch (error) {
        console.error('Error deleting restaurant:', error);
        res.status(500).send('Internal Server Error');
    }
});

//Get Restaurant review by id
router.get('/restaurants/:id/reviews', async (req, res) => {
    const { id } = req.params;
    try {
        const reviews = await getReviewsForRestaurant(parseInt(id));
        res.json(reviews);
    } catch (error) {
        console.error(`Error fetching reviews for restaurant with ID ${id}:`, error);
        res.status(500).send('Internal Server Error');
    }
});

export {router as backendRouter};




