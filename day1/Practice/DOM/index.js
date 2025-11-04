// Accessing DOM elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultsDiv = document.getElementById("results");
const paginationDiv = document.getElementById("pagination");
const sortSelect = document.getElementById("sortSelect");

let allMeals = [];
let currentPage = 1;
const itemsPerPage = 6;

searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("input", handleLiveSearch,1000);
sortSelect.addEventListener("change", handleSort);

// Fetching  meals from API
async function fetchMeals(query) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    let data = await response.json();

    if (!data.meals) {
      resultsDiv.innerHTML = `<p>No meals found for "${query}"</p>`;
      allMeals = [];
      paginationDiv.innerHTML = "";
      return;
    }

    allMeals = data.meals; 
    applySorting();
    currentPage = 1; 
    renderMeals(getPaginatedMeals());
    renderPagination();
  } catch (error) {
    console.log("Error fetching meals", error);
    resultsDiv.innerHTML = `<p>Error fetching meals. Please try again.</p>`;
  }
}

async function handleSearch() {
  const query = searchInput.value.trim();
  if (query) {
    await fetchMeals(query);
  }
}

async function handleLiveSearch() {
  const query = searchInput.value.trim();
  if (query.length > 2) {
    await fetchMeals(query);
  }
}

function handleSort() {
  applySorting();
  currentPage = 1; // Reset page after sort
  renderMeals(getPaginatedMeals());
  renderPagination();
}

// Render only meals for current page
function renderMeals(meals) {
  resultsDiv.innerHTML = meals
    .map(
      (item) => `
        <div class="meal-card">
          <img src="${item.strMealThumb}" alt="${item.strMeal}">
          <div class="meal-info">
            <h3>${item.strMeal}</h3>
            <p><strong>Area:</strong> ${item.strArea}</p>
            <p><strong>Category:</strong> ${item.strCategory}</p>
          </div>
        </div>
      `
    )
    .join("");
}

// Get meals for current page
function getPaginatedMeals() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return allMeals.slice(start, end);
}

// Pagination rendering
function renderPagination() {
  paginationDiv.innerHTML = "";
  const totalPages = Math.ceil(allMeals.length / itemsPerPage);
  if (totalPages <= 1) return;

  // Prev button
  if (currentPage > 1) {
    const prevBtn = createPaginationButton("Prev", () => {
      currentPage--;
      renderMeals(getPaginatedMeals());
      renderPagination();
    });
    paginationDiv.appendChild(prevBtn);
  }

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = createPaginationButton(i, () => {
      currentPage = i;
      renderMeals(getPaginatedMeals());
      renderPagination();
    });
    if (i === currentPage) {
      pageBtn.classList.add("active-page");
    }
    paginationDiv.appendChild(pageBtn);
  }

  // Next button
  if (currentPage < totalPages) {
    const nextBtn = createPaginationButton("Next", () => {
      currentPage++;
      renderMeals(getPaginatedMeals());
      renderPagination();
    });
    paginationDiv.appendChild(nextBtn);
  }
}

// Create pagination button
function createPaginationButton(text, clickHandler) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", clickHandler);
  return button;
}

// Sorting logic
function applySorting() {
  const sortValue = sortSelect.value;
  if (sortValue === "az") {
    allMeals.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
  } else if (sortValue === "za") {
    allMeals.sort((a, b) => b.strMeal.localeCompare(a.strMeal));
  }
}
