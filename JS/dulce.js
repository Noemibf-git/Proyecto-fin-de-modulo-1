let allRecipes = [];
const itemsPage = 5;
const MaxLimit = 30;
let currentPage = 1;

async function loadSweets() {
  const container = document.getElementById("containerRecipes");
  const url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert";
  // En este caso he preferido usar para probar en lugar de usar then, usar try y catch
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    allRecipes = data.meals.slice(0, MaxLimit);
    showPage(1);
  } catch (error) {
    console.error("Error", error);
  }
}

function showPage(page) {
  window.scrollTo({ top: 0, behavior: "smooth" }); //metodo de JS para que suba arriba, el top 0 hace que suba a lo alto de la pagina y el smooth hace que suba de manera suave
  currentPage = page; 
  const container = document.getElementById("containerRecipes");
  container.innerHTML = "";
  const start = (page - 1) * itemsPage;
  const end = start + itemsPage;
  const recipesToShow = allRecipes.slice(start, end); //Esto hace que se extraiga un sub-lista de los 30 items para poner solo los que queremos mostrar
  recipesToShow.forEach((recipes) => {
    container.innerHTML += `
            <div class="card__recipes">
                <img src="${recipes.strMealThumb}" alt="${recipes.strMeal}" class= "img__card">
                <h3 class="title__recipes">${recipes.strMeal}</h3>
                    <button onclick="callRecipes('${recipes.idMeal}')" class = "button__recipes">Ver receta</button>
                </div>`;
  });
  renderControls();
}

//Funcion para los botones
function renderControls() {
  const paginationDiv = document.getElementById("pagination");
  paginationDiv.innerHTML = ""; // Al pulsar los numeros, no se duplican
  const totalPages = Math.ceil(allRecipes.length / itemsPage); // Esto hace calcular cuantas paginas habrá y redondea para que ninguna se quede fuera
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.classList.add("btn__page");
    if (i === currentPage) {
      btn.classList.add("active");
    }
    btn.onclick = () => showPage(i);
    paginationDiv.appendChild(btn);
  }
}

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
  loadSweets();
});
