let allRecipes = [];
const itemsPage = 8;
const MaxLimit = 50;
let currentPage = 1;
const urlCategories = "https://www.themealdb.com/api/json/v1/1/categories.php";

//como no hay categoria saladas, he tenido que filtrar para que no sean postres y me salgan elementos de todas las categorias
async function getSaltyRecipes() {
  const response = await fetch(urlCategories);
  const data = await response.json();

  const saltyCategories = data.categories
    .filter((categorie) => categorie.strCategory !== "Dessert")
    .map((categorie) => categorie.strCategory);

  const categoryRecipes = {};
  for (const category of saltyCategories) {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const dataCat = await res.json();
    const meals = dataCat.meals || [];
    categoryRecipes[category] = meals;
  }

  const allRecipes = [];
  let done = false;
  while (!done) {
    done = true;
    for (const category of saltyCategories) {
      const recipes = categoryRecipes[category];
      if (recipes.length > 0 && allRecipes.length < MaxLimit) {
        allRecipes.push(recipes.shift());
        done = false;
      }
    }
  }
  return allRecipes;
}

async function loadSaltyRecipes() {
  allRecipes = await getSaltyRecipes();
  showPage(1);
}
function showPage(page) {
  window.scrollTo({ top: 0, behavior: "smooth" });
  currentPage = page;

  const container = document.getElementById("containerRecipes");
  container.innerHTML = "";

  const start = (page - 1) * itemsPage;
  const end = start + itemsPage;
  const recipesToShow = allRecipes.slice(start, end);

  recipesToShow.forEach((recipe) => {
    container.innerHTML += `
      <div class="card__recipes">
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="img__card">
        <h3 class="title__recipes">${recipe.strMeal}</h3>
        <button onclick="callRecipes('${recipe.idMeal}')" class="button__recipes">Ver receta</button>
      </div>
    `;
  });

  renderControls();
}

//Funcion para los botones
function renderControls() {
  const paginationDiv = document.getElementById("pagination");
  paginationDiv.innerHTML = "";

  const totalPages = Math.ceil(allRecipes.length / itemsPage);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.classList.add("btn__page");
    if (i === currentPage) btn.classList.add("active");
    btn.onclick = () => showPage(i);
    paginationDiv.appendChild(btn);
  }
}
// Modal para la receta
const modalRecipes = document.getElementById("recipeModal");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalInstructions = document.getElementById("instructions");
const closeModal = document.getElementById("closeModal");
async function callRecipes(id) {
  try {
    const urlDetails = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const resp = await fetch(urlDetails);
    const data = await resp.json();

    const recipes = data.meals[0];


    modalTitle.innerText = recipes.strMeal;
    modalImage.src = recipes.strMealThumb;
    modalImage.alt = recipes.strMeal;
    modalInstructions.innerText = recipes.strInstructions;
    modalRecipes.style.display = "flex";
    
  } catch (error) {
    console.error("Error al obtener la receta completa", error);
  }
}
closeModal.addEventListener("click", () => {
  modalRecipes.style.display = "none";
});

// Cerrar modal al hacer click fuera del contenido
window.addEventListener("click", (e) => {
  if (e.target === modalRecipes) {
    modalRecipes.style.display = "none";
  }
});


document.addEventListener("DOMContentLoaded", () => {
  loadSaltyRecipes();
});
