//Accessing DOM elements

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultsDiv = document.getElementById("results");
const paginationDiv=document.getElementById("pagination")

let allMeals = [];
let currentPage=1;
const itemsPerPage =6;





searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("input", handleLiveSearch);

// https://www.themealdb.com/api/json/v1/1/search.php?s=

async function handleSearch() {
  const query = searchInput.value.trim();
  if (query) {
    await fetchMeals(query);
  }
}

async function handleLiveSearch() {
    const query = searchInput.value.trim();
  if (query.length>2) {
    await fetchMeals(query);
  }
}


async function fetchMeals(query) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    let data = await response.json();
    console.log(data.meals, "es");

    resultsDiv.innerHTML = data.meals.map(
      (item) =>
        `  <div>Title : ${item.strMeal}</div>
            <div>Area : ${item.strArea}</div>
            <img src=${item.strMealThumb} alt="">`
    ).join('');
  } catch (error) {
    console.log("Error fetching meals", error);
  }
}
console.log(allMeals, "all");

// function renderMeals(meals){
//     resultsDiv.innerHTML="";
//     meals.forEach(meals){
//         const mealBox =document.createElement("div");
//         const title=document.createElement("h3");
//         const image=document.createElement("img");
//         const category=document.createElement("p");
//         const area=document.createElement("p");

//         title.textContent=mealBox.strMeal
//         image.src=mealBox.strMealThumb;
//         image.alt=mealBox.strMeal
//         category.textContent=`Category :${mealBox.strCategory}
//         `

//     }
// }

function renderPagination(){
    paginationDiv.innerHTML="";
    const totalPages =Math.ceil(allMeals.length/itemsPerPage);

    if(totalPages <=1) return;
    if(currentPage>1){
        const prevBtn=createPagination("PREV",()=>{
            currentPage--;
            fetchMeals();
        });
        paginationDiv.appendChild(prevBtn);
    }
}

function createPagination(text,clickHandler){
    const button=document.createElement("button");
    button.textContent=text;
    button.addEventListener("click",clickHandler);
    return button;
}