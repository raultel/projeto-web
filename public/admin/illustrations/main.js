import { apiGet, apiDelete } from "../../shared/admin/api.js";
import { buildAdminCard, attachAdminActions, setupAdminForm, openEditForm } from "../../shared/admin/ui.js";

async function loadIllustrations() {
    const illustrations = await apiGet("illustrations");
    const container = document.getElementById("illustrations-container");
    container.innerHTML = "";

    illustrations.forEach(r => {
        container.appendChild(buildAdminCard("illustrations", r));
    });

    attachAdminActions(container, {
        onDelete: async (model, id) => {
            await apiDelete(model, id);
            loadIllustrations();
        },
        onEdit: async (model, id) => {
            console.log("Edit", model, id);
            openEditForm(model, id)
        }
    });
}

loadIllustrations();
setupAdminForm("illustrations", loadIllustrations);
