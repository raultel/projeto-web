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
        </div>
        `;

        container.appendChild(card);
    });
}
