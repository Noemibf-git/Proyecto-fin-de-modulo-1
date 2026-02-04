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
    const modal = document.getElementById("modalReceta");
    const modalTitle = document.getElementById("modalTitle");
    const modalInstructions = document.getElementById("Instructions");
    const closeModal = document.getElementById("closeModal");
    const modalImage = document.getElementById("modalImage");

    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

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
            modalTitle.textContent = receta.strMeal;
            modalInstructions.textContent = receta.strInstructions;
            modalImage.src = receta.strMealThumb;
            modalImage.alt = receta.strMeal;
            modal.style.display = "flex";
          });

          recetasContenedor.appendChild(card);
        });
      })
      .catch((error) => {
        console.log("hubo un error", error);
      });
  });
