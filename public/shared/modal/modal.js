const modal = document.getElementById("register-modal");
const openBtn = document.getElementsByClassName("open-btn")[0];
const closeBtn = modal.querySelector(".close");
const form = document.getElementById("model-form");

/* Mostra o modal/form se clicar em add */
openBtn.onclick = () => {
    form.reset()
    modal.style.display = "flex";
    modal.dataset.value=-1;
};


/* Esconde/fecha o modal/form quando envia o form ou fecha ele */
closeBtn.onclick = () => {
    modal.style.display = "none";
    modal.dataset.value=-1;
};
form.addEventListener("submit", (e) => {
    e.preventDefault();
    modal.style.display = "none";
});

/* Clicar fora do modal fecha o form */
window.addEventListener("click", function(e){
    if(e.target===modal)
        modal.style.display="none";
});
