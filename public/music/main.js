import { api_get, api_create, api_delete, api_get_by_id, api_update } from "/shared/api.js"

const token = localStorage.getItem("jwtToken");
const form = document.getElementById("music-form");
const modal = document.getElementById("register-modal");


function edit_action(item) {
    modal.dataset.value=item.id;
    modal.style.display = "block";

    for (const key of Object.keys(item)) {
        const input = form.querySelector(`[name="${key}"]`);
        if (!input) continue;
        input.value = item[key];
    }
}

function build_card(item) {
    const div = document.createElement("div");
    div.classList.add("card");

    if (token) {
        div.innerHTML = `
        <button class="delete_btn">DEL</button>
        <button class="edit_btn">EDIT</button>
        `
        const deleteBtn = div.getElementsByClassName('delete_btn')[0];
        const editBtn   = div.getElementsByClassName('edit_btn')[0];

        deleteBtn.value = item.id;
        editBtn.value   = item.id;

        editBtn.addEventListener("click", () => edit_action(item));
        deleteBtn.addEventListener("click", () => delete_item(item.id));

        document.getElementById("open-modal-btn").style = "display: block"
    }

    for (const key in item) {
        if (key === "id") continue;

        const field_div = document.createElement("div");

        let value = item[key];

        if (key === "img_path" && item[key]) {
            value = `<img src="${item[key]}" alt="">`; // TO-DO: Add a alt field on model
        }

        field_div.innerHTML = `
        <div class="item-field">
        ${value}
        </div>
        `;

        div.appendChild(field_div)
    }

    return div;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
        if (Number(modal.dataset.value) === -1)
            await api_create("releases", formData);
        else
            await api_update("releases", modal.dataset.value, formData);
        await list_items();
    } catch (err) {
        console.error(err);
        // document.getElementById("response").textContent = "Erro ao salvar";
    }
});

async function list_items() {
    document.getElementById("music-collection").innerHTML = ""
    const musics = await api_get("releases");
    for(const music of musics) {
        const div = build_card(music)
        document.getElementById("music-collection").appendChild(div);
    }
}

async function delete_item(id) {
    try {
        const a = await api_get_by_id("releases", id);
        console.log(a);
        await api_delete("releases", id);
    } catch (err) {
        console.error(err);
    }
    await list_items()
}

await list_items();

