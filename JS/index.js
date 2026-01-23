let recetasContenedor = document.getElementById("contenedorRecetas");
let searchReceta = document
  .getElementById("searchButton")
  .addEventListener("click", () => {
    let inputReceta = document.getElementById("searchInput").value;
    if (inputReceta === "") {
      console.log("El campo está vacío. Escribe una receta");
      return;
    }
    document.getElementById("searchInput").value = "";
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputReceta}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        recetasContenedor.innerHTML = "";
        data.meals.forEach((receta) => {
          let card = document.createElement("div");
          card.classList.add("tarjetaReceta");

          let img = document.createElement("img");
          img.src = receta.strMealThumb;
          img.alt = receta.strMeal;
          img.classList.add("img__card");
          card.appendChild(img);

          let title = document.createElement("h3");
          title.textContent = receta.strMeal;
          card.appendChild(title);

          let button = document.createElement("button");
          button.textContent = "Ver receta";
          button.classList.add("button__recetas");
          card.appendChild(button);

          button.addEventListener("click", () => {
            alert(receta.strInstructions);
          });

          recetasContenedor.appendChild(card);
        });
      })
      .catch((error) => {
        console.log("hubo un error", error);
      });
  });
