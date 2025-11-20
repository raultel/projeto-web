import { api_get, api_create, api_delete, api_get_by_id, api_update } from "/shared/api.js"

export function edit_action(item, modal, form) {
    modal.dataset.value=item.id;
    modal.style.display = "block";

    for (const key of Object.keys(item)) {
        const input = form.querySelector(`[name="${key}"]`);
        if (!input) continue;
        input.value = item[key];
    }
}

export async function delete_item(model_name, id, list_items) {
    console.log(id);
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

export function setup_admin_view(item, modal, form, model_name) {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
    <button class="delete_btn">DEL</button>
    <button class="edit_btn">EDIT</button>
    `
    const deleteBtn = div.getElementsByClassName('delete_btn')[0];
    const editBtn   = div.getElementsByClassName('edit_btn')[0];

    deleteBtn.value = item.id;
    editBtn.value   = item.id;

    console.log(editBtn.click)
    console.log(item, modal, form)

    editBtn.addEventListener("click", () => edit_action(item, modal, form));
    deleteBtn.addEventListener("click", () => delete_item(model_name, item.id, list_items));

    console.log(editBtn.click)

    return div;
}
