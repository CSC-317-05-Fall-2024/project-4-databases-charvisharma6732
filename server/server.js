import express from 'express';
import { pool } from './config/database.js';
import path from 'path';
import { fileURLToPath } from 'url';
import restaurantModule from './data/restaurants.js';
import { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant } from './data/restaurants.js'; 
import { backendRouter } from './routes/api.js';


const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/attractions', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'attractions.html'));
});

const {restaurantData} = restaurantModule;

app.get('/restaurants', (req, res) => {
    const restaurants = getRestaurants();
    res.render('restaurants', {restaurants});
});

app.get('/restaurants/:id', (req, res) => {
    const ID = parseInt(req.params.id);
    const restaurant = getRestaurant(ID);

    if(restaurant)
    {
        res.render('restaurant-details', {restaurant});
    }
    else
    {
        res.status(404).send('No such restaurant found');
    }
});

app.get('/newRestaurant', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'newRestaurant.html'));
});

app.use('/api', backendRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
