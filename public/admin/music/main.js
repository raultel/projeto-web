import { renderReleases } from "./ui.js";

const formDiv = document.getElementById("form-div")
const form = document.getElementById("releases-form")
let editing_id = -1

function revealForm() {
    formDiv.style.display = "block";
}

function hideForm() {
    formDiv.style.display = "none";
    form.reset()
}

export async function loadReleases() {
    const res = await fetch("http://localhost:3000/api/releases");
    const data = await res.json();
    console.log("Fetched releases:", data);
    renderReleases(data);

    document.querySelectorAll(".release-delete").forEach(btn => {
        btn.addEventListener("click", () => {
            deleteRelease(btn.dataset.id);
        });
    });

    document.querySelectorAll(".release-update").forEach(btn => {
        btn.addEventListener("click", () => {
            openUpdate(btn.dataset.id);
        });
    });
}

export async function deleteRelease(id) {
    const res = await fetch(`/api/releases/${id}`, {
        method: "DELETE"
    });

    if (res.ok) {
        console.log("Deleted!");
        loadReleases(); // reload list from DB
    } else {
        console.log("Failed to delete");
    }
}

export async function updateRelease(form_data) {
    try {
        const res = await fetch(`/api/releases/${editing_id}`, {
            method: "PUT",
            body: form_data   // works with multer upload.none()
        // DO NOT set headers — fetch sets multipart/form-data automatically
        });

        if (!res.ok) {
            throw new Error("Erro ao atualizar: " + res.status);
        }

        const data = await res.json();
        return data;

    } catch (error) {
        document.getElementById("response").textContent =
        "Erro: " + error.message;
    }
}

export async function appendRelease(form_data) {
    console.log(form_data)
    try {
        const res = await fetch("/api/releases", {
            method: "POST",
            body: form_data
        })

        if (!res.ok) {
            throw new Error("Erro ao atualizar: " + res.status);
        }

        return await res.json();

    } catch (error) {
        document.getElementById("response").textContent =
        "Erro: " + error.message;
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const form_data = new FormData(form)
    if (editing_id === -1 ) {
        await appendRelease(form_data)
    }
    else if (editing_id > 0) {
        await updateRelease(form_data)
    }

    await loadReleases()
    hideForm()
    form.reset()
})

function addRelease() {
    revealForm();
    editing_id = -1
}

async function openUpdate(id) {
    const form = document.getElementById("releases-form");

    const res = await fetch(`/api/releases/${id}`);
    if (!res.ok) throw new Error("Erro ao buscar release");

    const data = await res.json();

    // Fill inputs automatically
    Object.keys(data).forEach(key => {
        const input = form.querySelector(`[name="${key}"]`);
        if (input) input.value = data[key];
    });
    revealForm();
    editing_id = id
}

loadReleases()

document.getElementById("add-release").addEventListener("click", () => addRelease());
document.getElementById("close-form").addEventListener("click", () => hideForm());
