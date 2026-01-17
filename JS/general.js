// MODAL PARA LOGIN
const loginLink = document.getElementById("loginLink")
const modal = document.getElementById("modalOverlay")
const modalBtn = document.getElementById("closeBtn")

loginLink.addEventListener('click', (e) =>{
  e.preventDefault() /*Esto evita que el enlace intente navegar a otra pagina*/
  modal.style.display = "flex";
})

modalBtn.addEventListener('click', () =>{
  modal.style.display = "none"
})

window.addEventListener('click', (e) =>{
  if(e.target === modal){
    modal.style.display = "none"
  }
} )

// FIN MODAL LOGIN

