const mealContainer = document.getElementById("mealContainer");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

let meals = []; // Original data
let filteredMeals = []; // Displayed data

// Fetch data from TheMealDB API
async function fetchMeals() {
  try {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a");
    const data = await res.json();
    meals = data.meals || [];
    filteredMeals = [...meals];
    displayMeals(filteredMeals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    mealContainer.innerHTML = "<p>Failed to load meals. Try again later.</p>";
  }
}

// Display meals on the page
function displayMeals(mealsList) {
  mealContainer.innerHTML = "";
  if (mealsList.length === 0) {
    mealContainer.innerHTML = "<p>No meals found.</p>";
    return;
  }

  mealsList.forEach(meal => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <div class="card-content">
        <h3>${meal.strMeal}</h3>
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Area:</strong> ${meal.strArea}</p>
      </div>
    `;

    mealContainer.appendChild(card);
  });
}

// Filter by name or category (live search)
searchInput.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  filteredMeals = meals.filter(
    (meal) =>
      meal.strMeal.toLowerCase().includes(term) ||
      meal.strCategory.toLowerCase().includes(term)
  );
  displayMeals(filteredMeals);
});

// Sort functionality
sortSelect.addEventListener("change", () => {
  const value = sortSelect.value;
  if (value === "name-asc") {
    filteredMeals.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
  } else if (value === "name-desc") {
    filteredMeals.sort((a, b) => b.strMeal.localeCompare(a.strMeal));
  } else if (value === "area-asc") {
    filteredMeals.sort((a, b) => a.strArea.localeCompare(b.strArea));
  } else if (value === "area-desc") {
    filteredMeals.sort((a, b) => b.strArea.localeCompare(a.strArea));
  }
  displayMeals(filteredMeals);
});

// Initial load
fetchMeals();
