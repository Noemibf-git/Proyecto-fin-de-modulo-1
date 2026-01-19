const nav = document.getElementById("headerNav")
const open = document.getElementById("button__menu")
const close = document.getElementById("buttonNavClose")

open.addEventListener("click", () =>{
  nav.classList.add("nav__visible");
})

close.addEventListener("click", () => {
    nav.classList.remove("nav__visible");
});

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

