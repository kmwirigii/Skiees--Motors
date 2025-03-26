document.addEventListener("DOMContentLoaded", () => {
    const carContainer = document.getElementById("car-container");
    const searchInput = document.getElementById("search");
    const priceFilter = document.getElementById("price-filter");
    const typeFilter = document.getElementById("type-filter");
    const favoritesContainer = document.getElementById("favorites-container");
    const clearFavoritesBtn = document.getElementById("clear-favorites");

    let carsData = [];
  
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];


  fetch("http://localhost:3000/cars")
    .then(response => response.json())
    .then(data => {
        carsData = data;
        displayCars(carsData);
    });

function displayCars(cars) {
    carContainer.innerHTML = "";
    cars.forEach(car => {
        const carCard = document.createElement("div");
        carCard.classList.add("car-card");
        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.name}">
            <h3>${car.name}</h3>
            <p>Price: ${car.price}</p>
            <p>Type: ${car.type}</p>
            <button class="favorite-btn" data-name="${car.name}">❤️ Add to Favorites</button>
        `;
        carContainer.appendChild(carCard);
    });
}

function setupFilters() {
    searchInput.addEventListener("input", filterCars);
    priceFilter.addEventListener("change", filterCars);
    typeFilter.addEventListener("change", filterCars);
}

function filterCars() {
    const searchTerm = searchInput.value.toLowerCase();
    const maxPrice = priceFilter.value;
    const selectedType = typeFilter.value;

    const filteredCars = carsData.filter(car =>
        car.name.toLowerCase().includes(searchTerm) &&
        (maxPrice === "all" || parseInt(car.price.replace(/\D/g, "")) <= parseInt(maxPrice)) &&
        (selectedType === "all" || car.type === selectedType)
    );
    displayCars(filteredCars);
}

setupFilters();




});
