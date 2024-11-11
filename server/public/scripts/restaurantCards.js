/* This file should contain definitions for deleteRestaurantCard,
    and js to attach it as a handler per card.
*/

const deleteRestaurantCard = async (restaurantID) => {

    try{
        const response = await fetch(`/api/restaurants/${restaurantID}`, {
            method: 'DELETE',
        });

        if(response.ok)
        {
            fetchAndRenderRestaurants();
        }
        else{
            console.error('Failed to delete');
        }
    } 
    catch(error)
    {
        console.error('Error: ', error)
    }
};

const fetchAndRenderRestaurants = async () => {
    try{
        const response = await fetch('/api/restaurants');
        const restaurants = await response.json();
    
        const restaurantContainer = document.querySelector('.restaurants');
        restaurantContainer.innerHTML = '';
    
        restaurants.forEach(restaurant => {
            const restaurantCard = document.createElement('div');
            restaurantCard.classList.add('restaurantItem');
            restaurantCard.setAttribute('data-id', restaurant.id);
    
            restaurantCard.innerHTML = `
                <img src="${restaurant.photo}" alt="${restaurant.name}">
                <div class="restaurantInfo">
                    <h3>${restaurant.name}</h3>
                    <p>${restaurant.address}</p>
                    <p>${restaurant.phone}</p>
                </div>
                <button class="deleteButton">X</button>
            `;

            const deleteButtons = restaurantCard.querySelector('.deleteButton')
            deleteButtons.addEventListener('click', async () => {
                const restaurantId = restaurantCard.getAttribute('data-id'); 
                await deleteRestaurantCard(restaurantId); 
            });

            restaurantContainer.appendChild(restaurantCard);
        });
    }
    catch(error)
    {
        console.error('Could not fetch restaurants: ', error)
    }

};


document.addEventListener('DOMContentLoaded', fetchAndRenderRestaurants);
