import { api_get, api_create, api_delete, api_get_by_id, api_update } from "/shared/api.js"
import { setup_form, setup_admin_view} from "/shared/crud.js"

const token = localStorage.getItem("jwtToken");
const form = document.getElementById("music-form");
const modal = document.getElementById("register-modal");
const model_name = "releases"

function build_card(item) {
    let div = document.createElement("div");
    div.classList.add("card");

    if (token) {
        div = setup_admin_view(item, modal, form, model_name)
        document.getElementById("open-modal-btn").style = "display: block"
    }

    div.innerHTML = `

        <div class="album_cover">
            <img src="${item.img_path}" alt="">
        </div>
        <div class="album_info">
            <div class="item-field"> ${item.title} </div>
            <div class="item-field"> ${item.description} </div>
            <div class="item-field"> ${item.date} </div>
            <div class="item-field"> ${item.duration} </div>
        </div>
    `  + div.innerHTML // TO-DO: Add a alt field on model

    return div;
}

async function list_items() {
    document.getElementById("music-collection").innerHTML = ""
    const musics = await api_get(model_name);
    for(const music of musics) {
        const div = build_card(music)
        document.getElementById("music-collection").appendChild(div);
    }
}

await setup_form(form, modal, model_name, list_items);
await list_items();

