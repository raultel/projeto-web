import { api_get, api_create, api_delete, api_get_by_id, api_update } from "/shared/api.js"
import { setup_form, setup_admin_view} from "/shared/crud.js"

const token = localStorage.getItem("jwtToken");
const form = document.getElementById("model-form");
const modal = document.getElementById("register-modal");
const model_name = "characters"

function withBreaks(text) {
    return text.replace(/\n/g, "<br>");
}

function build_card(item) {
    let div = document.createElement("div");
    let buttons;
    div.classList.add("card");

    if (token) {
        buttons = setup_admin_view(item, modal, form, model_name, build_card);
    }

    div.insertAdjacentHTML("afterbegin", `
    <div class="character-art">
        <img src="${item.img_path}" alt="">
    </div>
    <div class="character-info">
        <div class="item-field"><h1>${item.name}</h1></div>
        <div class="item-field">Outros nomes:: ${item.aliases}</div>
        <div class="item-field">Idade: ${item.age}</div>
        <div class="item-field">Espécie: ${item.species}</div>
        <div class="item-field">Gênero: ${item.gender}</div>
        <div class="item-field">Origem: ${item.origin}</div>
        <div class="item-field">${item.description}</div>
    </div>
    `);

    div.querySelector(".character-info").append(buttons);

    if (token)
        div.dataset.value = item.id;

    return div;
}


async function list_items() {
    document.getElementById("characters-collection").innerHTML = ""
    const musics = await api_get(model_name);
    if (!Array.isArray(musics)) return;
    for(let music of musics) {
        const div = build_card(music)
        document.getElementById("characters-collection").appendChild(div);
    }
}


await list_items();
if (token) {
    await setup_form(form, modal, model_name, build_card);
    document.getElementsByClassName("open-btn")[0].style = "display: block"
}
