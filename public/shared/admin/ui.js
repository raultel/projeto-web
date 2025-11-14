import { apiCreate, apiUpdate, apiGetById } from "./api.js";

let adminActionsAttached = false;

export function setupAdminForm(model, loadFunction) {

    const btnAdd = document.getElementById("btn-add");
    const form = document.getElementById("admin-form");
    const btnClose = document.getElementById("close-form");

    // Show form
    btnAdd.addEventListener("click", () => {
        delete form.dataset.editId;
        form.parentNode.style.display = "block";
    });

    // Close button
    btnClose.addEventListener("click", () => {
        delete form.dataset.editId;
        form.parentNode.style.display = "none";
    });

    // Submit form
    form.addEventListener("submit", async (e) => {
        e.preventDefault();



        const formData = new FormData(form);
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }
        const editId = form.dataset.editId;

        try {
            if (editId) {
                console.log(editId, "aa")
                await apiUpdate(model, editId, formData);
            } else {
                await apiCreate(model, formData);
            }

            form.parentNode.style.display = "none";
            form.reset();
            loadFunction();

        } catch (err) {
            console.error(err);
            document.getElementById("response").textContent = "Erro ao salvar";
            console.log("Erro ao salvar");
        }
    });
}

export async function openEditForm(model, id) {
    const form = document.getElementById("admin-form");
    form.dataset.editId = id;   // store the ID in the form

    const data = await apiGetById(model, id)

    // Fill the form automatically
    Object.keys(data).forEach(key => {
        const input = form.querySelector(`[name="${key}"]`);
        if (input) input.value = data[key];
    });

    form.parentNode.style.display = "block";
}

export function buildAdminCard(model, item) {
    const div = document.createElement("div");
    div.classList.add("admin-card");

    let fieldsHtml = "";
    for (const key in item) {
        if (key !== "id") {
            fieldsHtml += `
            <div class="item-field">
            <strong>${key}:</strong> ${item[key] ?? ""}
            </div>
            `;
        }
    }

    div.innerHTML = `
    ${fieldsHtml}
    <button class="item-edit" data-id="${item.id}" data-model="${model}" type="button">EDIT</button>
    <button class="item-delete" data-id="${item.id}" data-model="${model}" type="button">DELETE</button>
    `;

    return div;
}



export function attachAdminActions(container, { onDelete, onEdit }) {
    if (adminActionsAttached) return;
    adminActionsAttached = true;

    container.addEventListener("click", e => {

        if (e.target.classList.contains("item-delete")) {
            const id = e.target.dataset.id;
            const model = e.target.dataset.model;
            onDelete(model, id);
        }

        if (e.target.classList.contains("item-edit")) {
            const id = e.target.dataset.id;
            const model = e.target.dataset.model;
            onEdit(model, id);
        }
    });
}
