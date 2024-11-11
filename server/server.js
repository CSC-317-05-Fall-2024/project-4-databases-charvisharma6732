import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant } from './data/restaurants.js'; 
import { backendRouter } from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 3000;

// For compatibility with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for the attractions page
app.get('/attractions', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'attractions.html'));
});

// Route to get and render all restaurants
app.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await getRestaurants();  // Fetch restaurants from the database
        res.render('restaurants', { restaurants });   // Pass restaurants to the EJS template
    } catch (error) {
        console.error('Error rendering restaurants page:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to get and render a specific restaurant by ID
app.get('/restaurants/:id', async (req, res) => {
    const ID = parseInt(req.params.id);
    try {
        const restaurant = await getRestaurant(ID);  // Fetch restaurant by ID

        if (restaurant) {
            res.render('restaurant-details', { restaurant });
        } else {
            res.status(404).send('No such restaurant found');
        }
    } catch (error) {
        console.error(`Error fetching restaurant with ID ${ID}:`, error);
        res.status(500).send('Internal Server Error');
    }
});

// Route for the new restaurant form page
app.get('/newRestaurant', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'newRestaurant.html'));
});

// API routes for handling backend restaurant operations
app.use('/api', backendRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});