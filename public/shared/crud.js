import { api_get, api_create, api_delete, api_get_by_id, api_update } from "/shared/api.js"

function toDateOnly(datetimeString) {
    const match = datetimeString.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!match) return ""; // fallback
    return `${match[1]}-${match[2]}-${match[3]}`;
}


export function edit_action(item, modal, form) {
    modal.dataset.value=item.id;
    modal.style.display = "flex";

    for (const key of Object.keys(item)) {
        const input = form.querySelector(`[name="${key}"]`);
        if (!input) continue;
        if (input.type === "date") {
            input.value = toDateOnly(item[key]);   // convert
        } else {
            input.value = item[key];
        }
    }
}

export async function delete_item(model_name, id) {
    try {
        await api_delete(model_name, id);
    } catch (err) {
        console.error(err);
    }

    document.querySelectorAll(".card").forEach(function(card) {
        if (Number(card.dataset.value) === Number(id)) {
            card.remove();
        }
    });
}

function append_new_item(model_name, item, build_card) {
    const div = build_card(item);
    document.getElementById(model_name + "-collection").appendChild(div);
}

function update_item_div(item, id, build_card) {
    const new_card = build_card(item.data);

    document.querySelectorAll(".card").forEach(function(card) {
        if (card.dataset.value === id) {
            card.replaceWith(new_card);
        }
    });
}

export function setup_form(form, modal, model_name, build_card)
{
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            if (Number(modal.dataset.value) === -1) {
                let item = await api_create(model_name, formData);
                append_new_item(model_name, item, build_card);
            }
            else {
                let item = await api_update(model_name, modal.dataset.value, formData);
                update_item_div(item, modal.dataset.value, build_card)
            }
        } catch (err) {
            console.error(err);
        }
    });
}

export function setup_admin_view(item, modal, form, model_name, build_card) {
    const div = document.createElement("div");
    div.classList.add("admin-buttons");

    div.innerHTML = `
    <button class="delete_btn"><img src="/assets/buttons/del_btn.svg"></button>
    <button class="edit_btn"><img src="/assets/buttons/edit_btn.svg"></button>
    `
    const deleteBtn = div.getElementsByClassName('delete_btn')[0];
    const editBtn   = div.getElementsByClassName('edit_btn')[0];

    deleteBtn.value = item.id;
    editBtn.value   = item.id;

    editBtn.addEventListener("click", () => edit_action(item, modal, form));
    deleteBtn.addEventListener("click", () => delete_item(model_name, item.id));

    return div;
}
