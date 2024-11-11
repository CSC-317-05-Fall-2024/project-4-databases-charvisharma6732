/* This file should contain any DOM manipulation
needed to populate the header, nav, and footer elements
*/

function renderHeader(){
    const header = document.querySelector('header');
    header.innerHTML = `
        <section class="maui">
            <div class="over">
                <h2>Maui</h2>
            </div>
        </section>
    `;
}


function renderNav(){
    const nav = document.querySelector('nav');
    nav.innerHTML = `
        <ul class = "navLinks">
            <li><a href="/">Home</a></li>
            <li><a href="/attractions">Attractions</a></li>
            <li><a href="/restaurants">Restaurants</a></li>
            <li><a href="/newRestaurant">New Restaurant</a></li>
        </ul>
    `;
    nav.classList.add('navBar');
}


function renderFooter(){
    const footer = document.querySelector('footer');
    footer.innerHTML = `
        <p>&copy; 2024 Maui Travel guide</p>
    `;
}


renderHeader();
renderNav();
renderFooter();