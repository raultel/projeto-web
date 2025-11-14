import { apiGet, apiDelete } from "../shared/api.js";
import { buildCard, attachActions, setupForm, openEditForm } from "../shared/ui.js";

async function loadIllustrations() {
    const releases = await apiGet("releases");

    const container = document.getElementById("releases-container");
    container.innerHTML = "";

    for (const r of releases) {
        const card = await buildCard("releases", r);
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
setupForm("releases", loadIllustrations);

fetch('../shared/header.html')
.then(response => response.text())
.then(data => {
    document.getElementById('header-placeholder').innerHTML = data;
});
