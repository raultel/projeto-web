const modals = document.getElementsByClassName("img-modal");
const reg_modal = document.getElementById("register-modal");

window.addEventListener("click", function(e){
    if(e.target.classList.contains("img-modal"))
        for (let modal of modals)
            modal.style = "display: none";
});
