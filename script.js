document.addEventListener("DOMContentLoaded", () => {
    const carContainer = document.getElementById("car-container");
    const searchInput = document.getElementById("search");
    const priceFilter = document.getElementById("price-filter");
    const typeFilter = document.getElementById("type-filter");
    const favoritesContainer = document.getElementById("favorites-container");
    let carsData = [];
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Fetch car data
    fetch("cars.json")
        .then(response => response.json())
        .then(data => {
            carsData = data;
            displayCars(carsData);
            setupFilters();
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
        setupFavoriteButtons();
    }

    function setupFilters() {
        searchInput.addEventListener("input", () => filterCars());
        priceFilter.addEventListener("change", () => filterCars());
        typeFilter.addEventListener("change", () => filterCars());
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

    function setupFavoriteButtons() {
        document.querySelectorAll(".favorite-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const carName = e.target.getAttribute("data-name");
                if (!favorites.includes(carName)) {
                    favorites.push(carName);
                    localStorage.setItem("favorites", JSON.stringify(favorites));
                    alert(${carName} added to favorites!);
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
    }

    displayFavorites();
});