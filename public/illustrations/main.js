import { apiGet, apiDelete } from "../shared/api.js";
import { buildCard, attachActions, setupForm, openEditForm } from "../shared/ui.js";

async function loadIllustrations() {
    const illustrations = await apiGet("illustrations");

    const container = document.getElementById("illustrations-container");
    container.innerHTML = "";

    for (const r of illustrations) {
        const card = await buildCard("illustrations", r);
        container.appendChild(card);
    }

    attachActions(container, {
        onDelete: async (model, id) => {
            await apiDelete(model, id);
            loadIllustrations(); // reload after deletion
        },
        onEdit: async (model, id) => {
            console.log("Edit", model, id);
            openEditForm(model, id);
        }
    });
}



loadIllustrations();
setupForm("illustrations", loadIllustrations);

fetch('../shared/header.html')
.then(response => response.text())
.then(data => {
    document.getElementById('header-placeholder').innerHTML = data;
});
