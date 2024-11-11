const handleSubmit = async (event) => {
    event.preventDefault(); 

    // Extract fields from the form, and
    const formData = new FormData(event.target);

    const newRestaurant = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        photo: formData.get('photo') || 'images/bestbeach.jpeg',

    }

    // send a request to create a new restaurant
    try{
        const response = await fetch('/api/restaurants',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRestaurant),
        });

        if (response.ok){
            window.location.href = '/restaurants';
        }
        else
        {
            console.error('Did not create new restaurant');
        }
    }
    catch(error)
    {
        console.error('Did not create new restaurant', error);
    }

}

document.addEventListener('DOMContentLoaded', () => {
 
    // Add event listener to the form for submit events
    const form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit);
});
