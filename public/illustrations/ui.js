export function renderIllustrations(illustrations) {
    const container = document.getElementById("illustrations-container");
    container.innerHTML = "";

    illustrations.forEach(rel => {
        const card = document.createElement("div");
        card.className = "illustration-card";

        card.innerHTML = `
        <div class="illustration-info">
        <div class="illustration-title">${rel.title}</div>
        <div class="illustration-path">${rel.path}</div>
        <div class="illustration-description">${rel.description}</div>
        </div>
        `;

        container.appendChild(card);
    });
}
