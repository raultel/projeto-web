const modal = document.getElementById("register-modal");
const openBtn = document.getElementsByClassName("open-btn")[0];
const closeBtn = modal.querySelector(".close");
const form = document.getElementById("music-form");

openBtn.onclick = () => {
    form.reset()
    modal.style.display = "flex";
    modal.dataset.value=-1;
};
closeBtn.onclick = () => {
    modal.style.display = "none";
    modal.dataset.value=-1;
};
window.onclick = e => {
    if(e.target===modal) modal.style.display="none";
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    modal.style.display = "none";
});
