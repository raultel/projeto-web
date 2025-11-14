// import { deleteRelease, updateRelease, loadReleases } from "./main.js";

export function renderReleases(releases) {
    const container = document.getElementById("releases-container");
    container.innerHTML = "";

    releases.forEach(rel => {
        const card = document.createElement("div");
        card.className = "release-card";

        card.innerHTML = `
        <div class="release-info">
        <div class="release-title">${rel.title}</div>
        <div class="release-year">${rel.year}</div>
        <div class="release-description">${rel.description}</div>
        <button class="release-update" data-id="${rel.id}">EDIT</button>
        <button class="release-delete" data-id="${rel.id}">DELETE</button>
        </div>
        `;

        container.appendChild(card);
    });
}
