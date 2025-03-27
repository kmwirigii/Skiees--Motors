document.addEventListener("DOMContentLoaded", () => {
    const carContainer = document.getElementById("car-container");
    const searchInput = document.getElementById("search");
    const minPriceInput = document.getElementById("min-price");
    const maxPriceInput = document.getElementById("max-price");
    const typeFilter = document.getElementById("type-filter");
    const favoritesContainer = document.getElementById("favorites-container");
    const clearFavoritesBtn = document.getElementById("clear-favorites");

    let carsData = [];
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    fetch("cars.json")
        .then(response => response.json())
        .then(data => {
            carsData = data.cars; 
            displayCars(carsData);
            setupFavoriteButtons(); 
        })
        .catch(error => console.error("Error fetching cars:", error));

    function displayCars(cars) {
        carContainer.innerHTML = "";
        cars.forEach(car => {
            const carCard = document.createElement("div");
            carCard.classList.add("car-card");
            carCard.innerHTML = `
                <img src="${car.image}" alt="${car.name}">
                <h3>${car.name}</h3>
                <p>Price: Ksh ${car.price}</p>
                <p>Type: ${car.type}</p>
                <button class="favorite-btn" data-name="${car.name}">❤️ Add to Favorites</button>
            `;
            carContainer.appendChild(carCard);
        });
    }

    function setupFilters() {
        searchInput.addEventListener("input", filterCars);
        minPriceInput.addEventListener("input", filterCars);
        maxPriceInput.addEventListener("input", filterCars);
        typeFilter.addEventListener("change", filterCars);
    }

    function filterCars() {
        const searchTerm = searchInput.value.toLowerCase();
        const minPrice = minPriceInput.value ? parseInt(minPriceInput.value) : 0;
        const maxPrice = maxPriceInput.value ? parseInt(maxPriceInput.value) : Infinity;
        const selectedType = typeFilter.value;

        const filteredCars = carsData.filter(car => {
            const priceNum = parseInt(car.price.replace(/\D/g, ""));
            return (
                car.name.toLowerCase().includes(searchTerm) &&
                (priceNum >= minPrice && priceNum <= maxPrice) &&
                (selectedType === "all" || car.type === selectedType)
            );
        });
        displayCars(filteredCars);
        setupFavoriteButtons();
    }

    function setupFavoriteButtons() {
        document.querySelectorAll(".favorite-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const carName = e.target.getAttribute("data-name");
                if (!favorites.includes(carName)) {
                    favorites.push(carName);
                    localStorage.setItem("favorites", JSON.stringify(favorites));
                    displayFavorites();
                }
            });
        });
    }

    function displayFavorites() {
        favoritesContainer.innerHTML = "<h2>Favorites</h2>";
        favorites.forEach(carName => {
            const carItem = document.createElement("p");
            carItem.textContent = carName;
            favoritesContainer.appendChild(carItem);
        });
        favoritesContainer.appendChild(clearFavoritesBtn);
    }

    clearFavoritesBtn.addEventListener("click", () => {
        favorites = [];
        localStorage.removeItem("favorites");
        displayFavorites();
    });

    setupFilters();
    displayFavorites();
});