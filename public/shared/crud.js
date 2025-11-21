import { api_get, api_create, api_delete, api_get_by_id, api_update } from "/shared/api.js"

function toDateOnly(datetimeString) {
    // Extract only YYYY-MM-DD (works even with ancient years)
    const match = datetimeString.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!match) return ""; // fallback
    return `${match[1]}-${match[2]}-${match[3]}`;
}


export function edit_action(item, modal, form) {
    modal.dataset.value=item.id;
    modal.style.display = "block";

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

export async function delete_item(model_name, id, list_items) {
    try {
        await api_delete(model_name, id);
    } catch (err) {
        console.error(err);
    }
    await list_items()
}

export async function setup_form(form, modal, model_name, list_items)
{
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            if (Number(modal.dataset.value) === -1)
                await api_create(model_name, formData);
            else
                await api_update(model_name, modal.dataset.value, formData);
            await list_items();
        } catch (err) {
            console.error(err);
        }
    });
}

export function setup_admin_view(item, modal, form, model_name, list_items) {
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
    deleteBtn.addEventListener("click", () => delete_item(model_name, item.id, list_items));

    return div;
}
