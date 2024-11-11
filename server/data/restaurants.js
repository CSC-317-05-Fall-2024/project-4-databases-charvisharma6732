// Fill this in
let restaurantData = [
    {
        "id": 0,
        "name": "Hali'imaile",
        "phone": "(945)-222-8764",
        "address": "666 Cherry Road",
        "photo": "images/restaurant1.jpeg",
    },
    {
        "id": 1,
        "name": "Lahaina Grill",
        "phone": "(945)-828-7413",
        "address": "826 Moa Street",
        "photo": "images/restaurant2.jpeg",
    },
    {
        "id": 2,
        "name": "Kama's Fish",
        "phone": "(970)-286-3947",
        "address": "84 Wethel Road",
        "photo": "images/restaurant3.jpeg",
    },
    {
        "id": 3,
        "name": "Nalau's House",
        "phone": "(918)-554-3903",
        "address": "9244 Choka Drive",
        "photo": "images/restaurant4.jpeg",
    },
    {
        "id": 4,
        "name": "South Shore Grill",
        "phone": "(901)-851-1630",
        "address": "9670 Shoko Street",
        "photo": "images/restaurant5.jpeg",
    },
    {
        "id": 5,
        "name": "Kimo Kapalua",
        "phone": "(931)-878-6541",
        "address": "826 Fellows Road",
        "photo": "images/restaurant6.jpeg",
    },

    


    
];
export default { restaurantData };

//lastID becomes max ID in restaurantData array
let lastId = restaurantData.length > 0 ? Math.max(...restaurantData.map(r => r.id)) : -1; 
let deletedIDs = [];

const getNextId = () => {
    if(deletedIDs.length > 0)
    {
        return deletedIDs.pop();
    }
    lastId += 1;
    return lastId;
}

// Get a list of restaurants
const getRestaurants = () => {
    return restaurantData;
};


// Get a restaurant by id
const getRestaurant = (id) => {
    const restaurant = restaurantData.find((r) => r.id === id)
    return restaurant || null;
};

// Create a new restaurant entry
const createRestaurant = (newRestaurant) => {
    const id = getNextId();
    const restaurant = {id, ...newRestaurant};
    restaurantData.push(restaurant);
    return restaurant;
};

// Delete a restaurant by id
const deleteRestaurant = (id) => {
    const index = restaurantData.findIndex((r) => r.id === id)
    if(index !== -1)
    {
        restaurantData.splice(index, 1);
        deletedIDs.push(id);
        return true;
    }
    return false;
};

export { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant };