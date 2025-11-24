import { api_get, api_create, api_delete, api_get_by_id, api_update } from "/shared/api.js"
import { setup_form, setup_admin_view} from "/shared/crud.js"

const token = localStorage.getItem("jwtToken");
const form = document.getElementById("model-form");
const modal = document.getElementById("register-modal");
const model_name = "characters"

function withBreaks(text) {
    return text.replace(/\n/g, "<br>");
}

function create_item_field(content)
{
    let div = document.createElement("div");
    div.classList.add("item-field");
    div.textContent = content;
    return div;
}

function build_card(item) {
    let div = document.createElement("div");
    let buttons;
    div.classList.add("card");

    if (token) {
        buttons = setup_admin_view(item, modal, form, model_name, build_card);
    }

    let character_art = document.createElement("div");
    character_art.classList.add("character-art");
        let character_img = document.createElement("img");
        character_img.src = item.img_path;
        character_art.appendChild(character_img)
    div.appendChild(character_art);

    let character_info = document.createElement("div");
    character_info.classList.add("character-info");
        let name_div = document.createElement("div");
        name_div.classList.add("item-field");
            let name = document.createElement("h1");
            name.textContent = item.name;
        name_div.appendChild(name);

    character_info.appendChild(name_div);
    console.log("aliasses:", item.aliases)
    if (item.aliases !== "")
        character_info.appendChild(create_item_field('Outros nomes: '+item.aliases));
    if (item.age !== "" && item.age !== 0)
        character_info.appendChild(create_item_field('Idade: '+item.age));
    if (item.species !== "")
        character_info.appendChild(create_item_field('Espécie: '+item.species));
    if (item.gender !== "")
        character_info.appendChild(create_item_field('Gênero: '+item.gender));
    if (item.origin !== "")
        character_info.appendChild(create_item_field('Origem: '+item.origin));
    let desc_div = document.createElement("div");
    desc_div.classList.add("item-field");
        let description = document.createElement("p");
        description.textContent = item.description;
    desc_div.appendChild(description);
    character_info.appendChild(desc_div);

    div.appendChild(character_info);


    if (token) {
        div.querySelector(".character-info").append(buttons);
        div.dataset.value = item.id;
    }

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
