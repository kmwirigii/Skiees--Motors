document.addEventListener("DOMContentLoaded", () => {
    const carContainer = document.getElementById("car-container");
    let carsData = [];


    fetch("cars.json")
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
            `;
            carContainer.appendChild(carCard);
        });
    }
});
