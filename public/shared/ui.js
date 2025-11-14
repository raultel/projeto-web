import { apiCreate, apiUpdate, apiGetById } from "./api.js";

let actionsAttached = false;
const token = localStorage.getItem("jwtToken");

function hidePreviews(form) {
    const previews = form.querySelectorAll("img[id^='preview-']");
    previews.forEach(p => {
        p.style.display = "none";
        p.src = "";
    });
}


export function setupForm(model, loadFunction) {
    if (!token) return;

    const btnAdd = document.getElementById("btn-add");
    const form = document.getElementById("form");
    const btnClose = document.getElementById("close-form");

    // Show form
    btnAdd.style.display = "block";
    btnAdd.addEventListener("click", () => {
        delete form.dataset.editId;
        form.parentNode.style.display = "block";
        form.reset();
        hidePreviews(form);
    });

    // Close button
    btnClose.addEventListener("click", () => {
        delete form.dataset.editId;
        form.parentNode.style.display = "none";
        form.reset();
        hidePreviews(form);
    });

    // Submit form
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const editId = form.dataset.editId;

        try {
            if (editId) {
                await apiUpdate(model, editId, formData);
            } else {
                await apiCreate(model, formData);
            }

            form.parentNode.style.display = "none";
                          form.reset();
                          hidePreviews(form);

            await loadFunction(); // reload cards
        } catch (err) {
            console.error(err);
            document.getElementById("response").textContent = "Erro ao salvar";
        }
    });
}

export async function openEditForm(model, id) {
    if (!token) return;
    const form = document.getElementById("form");
    form.dataset.editId = id;

    const data = await apiGetById(model, id);

    // Fill inputs
    for (const key of Object.keys(data)) {
        const input = form.querySelector(`[name="${key}"]`);
        if (!input) continue;

        if (input.type === "file") {
            const preview = form.querySelector(`#preview-${key}`);
            if (preview && data[key]) {
                try {
                    const res = await fetch(`/api/image/${data[key]}`);
                    const json = await res.json();
                    preview.src = json.url;
                    preview.style.display = "block";
                } catch (err) {
                    console.error("Failed to load image preview", err);
                    preview.style.display = "none";
                }
            }
        } else {
            input.value = data[key];
        }
    }

    form.parentNode.style.display = "block";
}



export async function buildCard(model, item) {
    const div = document.createElement("div");
    div.classList.add("card");

    let fieldsHtml = "";

    for (const key in item) {
        if (key === "id") continue;

        let value = item[key];

        // Image field
        if (key === "path" && item[key]) {
            try {
                const res = await fetch(`/api/image/${item[key]}`);
                if (!res.ok) throw new Error("Image not found");
                const data = await res.json();
                value = `<img src="${data.url}" alt="${key}">`;
            } catch (err) {
                console.error("Failed to load image", err);
                value = "Image not available";
            }

            // For images, add without the label
            fieldsHtml += `
            <div class="item-field">
            ${value}
            </div>
            `;
        } else {
            // All other fields keep the label
            fieldsHtml += `
            <div class="item-field">
            <strong>${key}:</strong> ${value ?? ""}
            </div>
            `;
        }
    }

    div.innerHTML = token ? `
    ${fieldsHtml}
    <button class="item-edit" data-id="${item.id}" data-model="${model}" type="button">EDIT</button>
    <button class="item-delete" data-id="${item.id}" data-model="${model}" type="button">DELETE</button>
    ` : fieldsHtml;

    return div;
}



export function attachActions(container, { onDelete, onEdit }) {
    if (actionsAttached || !token) return;
    actionsAttached = true;

    container.addEventListener("click", (e) => {
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

