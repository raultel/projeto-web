import { api_get, api_create, api_delete, api_get_by_id, api_update } from "/shared/api.js"
import { setup_form, setup_admin_view} from "/shared/crud.js"

const token = localStorage.getItem("jwtToken");
const form = document.getElementById("model-form");
const modal = document.getElementById("register-modal");
const model_name = "images";
const container = document.getElementById("images-collection");

function show_img_modal(id, modal) {
    modal.style = "display: flex";
}

function build_card(item) {
    let card = document.createElement("div");
    card.classList.add("card");

    let img_btn = document.createElement("button");
    let img = document.createElement("img");
    img.classList.add("list-img")
    img_btn.value = item.id;
    img.src = item.img_path;
    img.alt = item.description;
    img_btn.appendChild(img);
    card.appendChild(img_btn);

    let img_modal = document.createElement("div");
    let img_modal_content = document.createElement("div");
    let img_zoom = document.createElement("img");
    let img_title = document.createElement("h2");
    img_modal.classList.add("img-modal");
    img_modal_content.classList.add("img-modal-content");
    img_zoom.src = item.img_path;
    img_zoom.alt = item.description;
    img_title.textContent = item.title;
    img_title.textContent = item.title;
    img_modal_content.appendChild(img_title);
    img_modal_content.appendChild(img_zoom);
    img_modal.appendChild(img_modal_content);

    img_btn.addEventListener("click", function(e){
        show_img_modal(img_btn.value, img_btn.nextSibling)
    });

    if (token) {
        let btns_div = setup_admin_view(item, modal, form, "images", list_items);
        img_modal_content.append(btns_div);

        /* Esconde o modal da imagem para mostrar o modal do form */
        for (let btn of btns_div.children) {
            console.log(item)
            btn.addEventListener("click", function(e) {
                console.log(btn.parentElement.parentElement)
                btn.parentElement.parentElement.parentElement.style= "display: none";
            });
        }
    }

    card.appendChild(img_modal);

    return card;
}

async function list_items() {
    container.innerHTML = ""
    const items = await api_get(model_name);
    for(const item of items) {
        const div = build_card(item)
        container.appendChild(div);
    }
}


await list_items();
if (token) {
    await setup_form(form, modal, model_name, list_items);
    document.getElementsByClassName("open-btn")[0].style = "display: block";
}
