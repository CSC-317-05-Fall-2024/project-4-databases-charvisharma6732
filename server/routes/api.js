import express from 'express';
import restaurants, { deleteRestaurant, getRestaurants, createRestaurant, getRestaurant} from '../data/restaurants.js';
const router = express.Router();

//Get All Restaurants
router.get('/restaurants', (req, res) => {
    const allRestaurants = getRestaurants();
    res.json(allRestaurants);
});

//Get Restaurant by ID
router.get('/restaurants/:id', (req, res) => {
    const ID = parseInt(req.params.id);
    const restaurant = getRestaurant(ID);

    if(restaurant)
    {
        res.json(restaurant);
    }
    else
    {
        res.status(404).json('No such restaurant found');
    }
});

//Post New Restaurant
router.post('/restaurants', (req, res) => {
    const newRestaurant = req.body;
    console.log("Received data:", req.body); 

    if(newRestaurant && newRestaurant.name && newRestaurant.phone && newRestaurant.address)
    {
        const restaurant = createRestaurant(newRestaurant);
        res.status(201).json(restaurant);
    }
    else{
        res.status(404).json('Error');
    }

});

//Delete Restaurant
router.delete('/restaurants/:id', (req, res) => {
    const ID = parseInt(req.params.id);
    const deleted = deleteRestaurant(ID);
    console.log("deleted data:", deleted); 


    if(deleted)
    {
        res.json({message: 'Restaurant deleted'});
    }
    else{
        res.status(404).json('Error');
    }
});


export {router as backendRouter};




