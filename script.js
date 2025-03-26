document.addEventListener("DOMContentLoaded", () => {
    const carContainer = document.getElementById("car-container");
    const searchInput = document.getElementById("search");
    const priceFilter = document.getElementById("price-filter");
    const typeFilter = document.getElementById("type-filter");
    const favoritesContainer = document.getElementById("favorites-container");
    const clearFavoritesBtn = document.getElementById("clear-favorites");

    let carsData = [];
  
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
});